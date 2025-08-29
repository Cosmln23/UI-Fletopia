import { createServerClient as createSSRClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { NextRequest, NextResponse } from 'next/server';
import type { Database } from '@/lib/supabase/types';

type TypedClient = SupabaseClient<Database>;

const secureCookie = (process.env.NEXT_PUBLIC_APP_ENV === 'production');

/**
 * createServerClient
 * - For Server Components (RSC) and standard SSR usage.
 * - Uses Next.js App Router cookies() API to manage auth session.
 */
export function createServerClient(): TypedClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const client = createSSRClient<Database>(
    url,
    anon,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
        flowType: 'pkce',
      },
      cookies: {
        async getAll() {
          const store = await cookies();
          return store.getAll().map((c) => ({ name: c.name, value: c.value }));
        },
        // In RSC, cookies cannot be mutated. We no-op here to avoid runtime errors.
        setAll(cookiesToSet) {
          // explicitly reference to satisfy no-unused-vars rule
          void cookiesToSet;
          return;
        },
      },
      global: { headers: { 'X-Client-Context': 'server' } },
    }
  );
  return client;
}

/**
 * createServerActionClient
 * - For Server Actions. Same cookie strategy, isolated factory for clarity.
 */
export function createServerActionClient(): TypedClient {
  return createServerClient();
}

/**
 * createMiddlewareClient
 * - For Next.js Middleware (edge). Mutates response cookies for session persistence.
 */
export function createMiddlewareClient(req: NextRequest, res: NextResponse): TypedClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const client = createSSRClient<Database>(
    url,
    anon,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
        flowType: 'pkce',
      },
      cookies: {
        getAll() {
          return req.cookies.getAll().map((c) => ({ name: c.name, value: c.value }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set({
              name,
              value,
              httpOnly: true,
              sameSite: 'lax',
              secure: secureCookie,
              path: '/',
              ...options,
            });
          });
        },
      },
      global: { headers: { 'X-Client-Context': 'middleware' } },
    }
  );
  return client;
}

/**
 * createRouteHandlerClient
 * - For Route Handlers (app/api/*). Allows cookie mutation on the response.
 */
export function createRouteHandlerClient(req: NextRequest, res: NextResponse): TypedClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const client = createSSRClient<Database>(
    url,
    anon,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
        flowType: 'pkce',
      },
      cookies: {
        getAll() {
          return req.cookies.getAll().map((c) => ({ name: c.name, value: c.value }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set({
              name,
              value,
              httpOnly: true,
              sameSite: 'lax',
              secure: secureCookie,
              path: '/',
              ...options,
            });
          });
        },
      },
      global: { headers: { 'X-Client-Context': 'route' } },
    }
  );
  return client;
}

/**
 * Helper: fetch current user on server, RLS-aware.
 */
export async function getServerUser() {
  // If env is missing at build/prerender, avoid throwing and return anonymous
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { user: null, error: null } as const;
  }
  const supabase = createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return { user: null, error } as const;
  return { user: data.user, error: null } as const;
}



