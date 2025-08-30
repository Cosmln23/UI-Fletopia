/*
  Geocoding service with cache-first strategy using public.geocoding_cache
  - Server-only (uses server Supabase client and server env)
  - Google Maps Geocoding API integration (JSON)
  - Memory cache with TTL to avoid duplicate requests within the same process
*/

import crypto from 'node:crypto';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/types';

type TypedClient = SupabaseClient<Database>;

export type GeocodeResult = {
  lat: number;
  lng: number;
  formattedAddress?: string;
  provider: 'cache' | 'google';
  raw?: unknown;
};

const MEMORY_TTL_MS = 5 * 60 * 1000; // 5 minutes
const DB_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const memoryCache: Map<string, { exp: number; value: GeocodeResult }> = new Map<string, { exp: number; value: GeocodeResult }>();

function assertServer(): void {
  if (typeof window !== 'undefined') {
    throw new Error('geocoding service must be used on the server');
  }
}

export function normalizeAddress(address: string): string {
  return address
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ');
}

export function hashAddress(address: string): string {
  return crypto.createHash('sha256').update(address).digest('hex');
}

function getGoogleApiKey(): string | null {
  const key = process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_GEOCODING_KEY || null;
  const trimmed = key?.trim();
  return trimmed ? trimmed : null;
}

async function fetchFromGoogle(address: string): Promise<GeocodeResult | null> {
  const apiKey = getGoogleApiKey();
  if (!apiKey) {
    console.warn('[geocoding] Missing GOOGLE_MAPS_API_KEY; skipping API call');
    return null;
  }

  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
  url.searchParams.set('address', address);
  url.searchParams.set('key', apiKey);

  const resp: Response = await fetch(url.toString(), { method: 'GET' });
  if (!resp.ok) {
    console.warn('[geocoding] Google API HTTP error', resp.status);
    return null;
  }
  type GoogleResult = {
    formatted_address?: string;
    geometry?: { location?: { lat?: number; lng?: number } };
  };
  type GoogleResponse = { status?: string; results?: GoogleResult[] };
  const raw: unknown = await resp.json();
  const data: GoogleResponse = (typeof raw === 'object' && raw !== null) ? (raw as GoogleResponse) : {};
  const status: string = data.status ?? 'UNKNOWN_ERROR';
  if (status !== 'OK') {
    console.warn('[geocoding] Google API status', status);
    return null;
  }
  const result = Array.isArray(data.results) ? data.results[0] : undefined;
  const loc = result?.geometry?.location;
  const lat = typeof loc?.lat === 'number' ? loc.lat : undefined;
  const lng = typeof loc?.lng === 'number' ? loc.lng : undefined;
  if (lat == null || lng == null) return null;
  const parsed: GeocodeResult = {
    lat,
    lng,
    formattedAddress: result?.formatted_address ?? undefined,
    provider: 'google',
    raw: result,
  };
  return parsed;
}

async function readCache(
  supabase: TypedClient,
  normalizedAddress: string
): Promise<GeocodeResult | null> {
  const now = Date.now();
  const mem = memoryCache.get(normalizedAddress);
  if (mem?.exp && mem.exp > now) {
    return mem.value;
  }

  const sinceIso = new Date(now - DB_TTL_MS).toISOString();
  const { data, error } = await supabase
    .from('geocoding_cache')
    .select('lat, lng, provider, query_text, created_at, geo')
    .eq('query_text', normalizedAddress)
    .gte('created_at', sinceIso)
    .maybeSingle<{
      lat: number | null;
      lng: number | null;
      provider: string | null;
    }>();
  if (error) {
    console.warn('[geocoding] cache read error', error.message);
    return null;
  }
  if (data?.lat == null || data?.lng == null) return null;
  const value: GeocodeResult = {
    lat: data.lat,
    lng: data.lng,
    provider: 'cache',
  };
  memoryCache.set(normalizedAddress, { exp: now + MEMORY_TTL_MS, value });
  return value;
}

async function writeCache(
  supabase: TypedClient,
  normalizedAddress: string,
  result: GeocodeResult
): Promise<void> {
  try {
    const { error } = await supabase
      .from('geocoding_cache')
      .upsert(
        [
          {
            query_text: normalizedAddress,
            provider: result.provider,
            lat: result.lat,
            lng: result.lng,
            // geo point could be set by DB trigger or here if available
            // created_at defaults in DB
          },
        ],
        { onConflict: 'query_text' }
      );
    if (error) {
      console.warn('[geocoding] cache write error', error.message);
    }
  } catch (e) {
    console.warn('[geocoding] cache write exception', (e as Error).message);
  }
}

/**
 * Geocode a single address using cache-first strategy.
 * Requires server context and a server Supabase client.
 */
export async function geocodeAddress(
  supabase: TypedClient,
  address: string
): Promise<GeocodeResult | null> {
  assertServer();
  const normalized = normalizeAddress(address);

  // 1) Memory/DB cache
  const cached = await readCache(supabase, normalized);
  if (cached) return cached;

  // 2) External provider
  const fromApi = await fetchFromGoogle(normalized);
  if (fromApi) {
    // fire-and-forget cache write
    void writeCache(supabase, normalized, fromApi);
    memoryCache.set(normalized, { exp: Date.now() + MEMORY_TTL_MS, value: fromApi });
    return fromApi;
  }

  return null;
}

/**
 * Batch geocoding (simple sequential for now) – future optimization: concurrency limit.
 */
export async function geocodeAddresses(
  supabase: TypedClient,
  addresses: string[]
): Promise<Map<string, GeocodeResult | null>> {
  assertServer();
  const out = new Map<string, GeocodeResult | null>();
  for (const a of addresses) {
    const r = await geocodeAddress(supabase, a);
    out.set(a, r);
  }
  return out;
}


