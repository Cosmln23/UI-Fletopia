import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';

// NOTE: Service role key must NOT be exposed in UI. This file is for reference only.
export function createAdminClient(serviceRoleKey: string) {
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}


