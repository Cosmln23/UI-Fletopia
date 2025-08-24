#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');
const fs = require('node:fs');

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  const txt = fs.readFileSync(file, 'utf8');
  txt.split(/\r?\n/).forEach((line) => {
    if (!line || line.startsWith('#')) return;
    const i = line.indexOf('=');
    if (i === -1) return;
    const k = line.slice(0, i).trim();
    const v = line.slice(i + 1).trim();
    if (!process.env[k]) process.env[k] = v;
  });
}

loadEnv('.env.local');
loadEnv('.env');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anon) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(url, anon);

(async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Supabase connectivity failed:', error.message);
    process.exit(1);
  }
  console.log('Supabase connectivity OK');
})();


