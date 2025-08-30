'use server'

import { z } from 'zod';
import { createServerActionClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';
import type { SupabaseClient } from '@supabase/supabase-js';
import { geocodeAddress } from '@/lib/services/geocoding';

type TypedClient = SupabaseClient<Database>;

const UpdateSchema = z.object({
  fullName: z.string().min(2).max(80),
  companyName: z.string().max(120).optional(),
  homeBaseAddress: z.string().max(160).optional(),
  phone: z.string().regex(/^\+?\d[\d\s-]{7,}$/i).optional(),
});

export type UpdatePayload = z.infer<typeof UpdateSchema>;

export type UpdateResult = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
  data?: {
    fullName: string;
    companyName?: string;
    phone?: string;
    homeBaseGeoUpdated?: boolean;
  };
};

async function coreUpdateProfile(supabase: TypedClient, payload: UpdatePayload): Promise<UpdateResult> {
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData.user) {
    return { ok: false, message: 'Nu sunteți autentificat.' };
  }
  const userId = userData.user.id;

  // Prepare update object
  const update: Record<string, unknown> = {
    full_name: payload.fullName,
    company_name: payload.companyName ?? null,
    // phone could be stored in a separate column when available; keeping in memory for now
  };

  let homeBaseGeoUpdated = false;
  if (payload.homeBaseAddress && payload.homeBaseAddress.trim().length > 0) {
    const geo = await geocodeAddress(supabase, payload.homeBaseAddress);
    if (geo && typeof geo.lat === 'number' && typeof geo.lng === 'number') {
      // PostgREST accepts GeoJSON for geography/geometry
      update.home_base_geo = { type: 'Point', coordinates: [geo.lng, geo.lat] };
      homeBaseGeoUpdated = true;
    } else {
      // graceful: keep previous geo, return message
      homeBaseGeoUpdated = false;
    }
  }

  const { error: updErr } = await supabase
    .from('profiles')
    .update(update)
    .eq('user_id', userId);
  if (updErr) {
    return { ok: false, message: 'Salvarea profilului a eșuat. Încercați din nou.' };
  }

  return {
    ok: true,
    data: {
      fullName: payload.fullName,
      companyName: payload.companyName,
      phone: payload.phone,
      homeBaseGeoUpdated,
    },
  };
}

export async function updateProfileAction(formData: FormData): Promise<UpdateResult> {
  const supabase = createServerActionClient();
  const parsed = UpdateSchema.safeParse({
    fullName: String(formData.get('fullName') ?? ''),
    companyName: (formData.get('companyName') ?? undefined) as string | undefined,
    homeBaseAddress: (formData.get('homeBaseAddress') ?? undefined) as string | undefined,
    phone: (formData.get('phone') ?? undefined) as string | undefined,
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors, message: 'Date invalide în formular.' };
  }
  return coreUpdateProfile(supabase, parsed.data);
}

export { coreUpdateProfile };


