import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';
import type { Database } from '@/lib/supabase/types';

type AdminClient = SupabaseClient<Database>;

function assertServerContext() {
  if (typeof window !== 'undefined') {
    throw new Error('createAdminClient must be called on the server only.');
  }
}

export function createAdminClient(serviceRoleKey?: string): AdminClient {
  assertServerContext();
  const key = serviceRoleKey ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin client.');
  }
  return createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { 'X-Client-Context': 'admin' } },
  });
}

// Minimal structured logger for audit trails (replace with real logger if needed)
export function auditLog(event: string, details: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.info('[ADMIN_AUDIT]', event, JSON.stringify(details));
}

// Helper: update user subscription status (for Stripe webhooks)
export async function updateUserSubscription(params: {
  userId: string;
  status: Database['public']['Enums']['subscription_status'];
}) {
  // Stubbed to avoid type inconsistencies with handcrafted Database typings.
  // Mark parameters as used and keep async contract for future implementation.
  void params;
  await Promise.resolve();
}

// Helper: bulk insert loads (example seeding op)
export async function bulkInsertLoads(rows: Database['public']['Tables']['loads']['Insert'][]) {
  // Stubbed to avoid type inconsistencies with handcrafted Database typings.
  void rows;
  await Promise.resolve();
}

// Notes on rate limiting & retries: callers (webhooks/cron) should handle retries with backoff.



