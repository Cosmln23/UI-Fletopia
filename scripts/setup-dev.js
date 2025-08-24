#!/usr/bin/env node
// Creates .env.local if missing and populates sane defaults
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const envLocal = path.join(root, '.env.local');

if (fs.existsSync(envLocal)) {
  console.log('.env.local already exists. Skipping.');
  process.exit(0);
}

const lines = [
  'NEXT_PUBLIC_API_BASE_URL=http://localhost:4000',
  'NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY=dev-anon-key',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_',
  'STRIPE_SECRET_KEY=sk_test_',
  'OPENAI_API_KEY=',
  'NEXT_PUBLIC_APP_ENV=development',
  '',
];

fs.writeFileSync(envLocal, lines.join('\n'));
console.log('Created .env.local with development defaults.');

