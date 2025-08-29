#!/usr/bin/env node
/*
  Trigger verification script for public.handle_new_user
  - Creates 3 users via Admin API (carrier, no user_type, invalid user_type)
  - Verifies auto-created rows in public.profiles and role mapping/fallbacks
*/

const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

async function main() {
  loadEnv('.env.local');
  loadEnv('.env');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const ts = Date.now();

  const scenarios = [
    {
      label: 'valid_carrier',
      email: `test+carrier_${ts}@example.com`,
      meta: { user_type: 'carrier', full_name: 'Test Carrier', company: 'TestCo' },
      expectedRole: 'carrier',
    },
    {
      label: 'no_user_type',
      email: `test+fallback_${ts}@example.com`,
      meta: { full_name: 'NoType User', company: 'TestCo' },
      expectedRole: 'carrier',
    },
    {
      label: 'invalid_user_type',
      email: `test+invalid_${ts}@example.com`,
      meta: { user_type: 'driver', full_name: 'Invalid Role', company: 'TestCo' },
      expectedRole: 'carrier',
    },
  ];

  const results = [];

  for (const s of scenarios) {
    // Create user via Admin API with metadata and email confirmed
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: s.email,
      password: 'StrongP@ssw0rd!',
      user_metadata: s.meta,
      email_confirm: true,
    });

    if (createErr) {
      results.push({ scenario: s.label, email: s.email, createError: createErr.message });
      continue;
    }

    const userId = created.user?.id ?? null;
    // Give the trigger a short moment to run
    await new Promise((r) => setTimeout(r, 2000));

    // Query the created profile
    const { data: profile, error: profileErr } = await admin
      .from('profiles')
      .select('user_id, role, full_name, company_name')
      .eq('user_id', userId)
      .maybeSingle();

    // Duplicate prevention check: try to insert same user_id again and ensure conflict
    let duplicateInsertStatus = 'skipped';
    let duplicateInsertError = null;
    if (userId) {
      const { error: dupErr } = await admin
        .from('profiles')
        .insert({ user_id: userId, role: 'carrier' });
      if (dupErr) {
        duplicateInsertStatus = 'conflict';
        duplicateInsertError = dupErr.message;
      } else {
        duplicateInsertStatus = 'unexpected_success';
      }
    }

    const roleOk = profile?.role === s.expectedRole;

    results.push({
      scenario: s.label,
      email: s.email,
      userId,
      expectedRole: s.expectedRole,
      profile,
      roleOk,
      profileError: profileErr?.message ?? null,
      duplicateInsertStatus,
      duplicateInsertError,
    });
  }

  console.log(JSON.stringify({ ok: true, results }, null, 2));
}

main().catch((err) => {
  console.error(err?.message || err);
  process.exit(1);
});


