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
  const key = serviceRoleKey ?? env.SUPABASE_SERVICE_ROLE_KEY;
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
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('profiles')
    .update({ subscription_status: params.status })
    .eq('user_id', params.userId);
  if (error) {
    auditLog('subscription_update_failed', { userId: params.userId, error: error.message });
    throw error;
  }
  auditLog('subscription_update_success', { userId: params.userId, status: params.status });
}

// Helper: bulk insert loads (example seeding op)
export async function bulkInsertLoads(rows: Database['public']['Tables']['loads']['Insert'][]) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('loads').insert(rows);
  if (error) {
    auditLog('bulk_insert_loads_failed', { count: rows.length, error: error.message });
    throw error;
  }
  auditLog('bulk_insert_loads_success', { count: rows.length });
}

// Notes on rate limiting & retries: callers (webhooks/cron) should handle retries with backoff.



