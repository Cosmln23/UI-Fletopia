#!/usr/bin/env node
const { createRequire } = require('module');
const requireFromRoot = createRequire(process.cwd() + '/');

const required = [
  '@supabase/supabase-js',
  '@supabase/ssr',
  'zod',
  'stripe',
  '@stripe/stripe-js',
  'openai',
  'lucide-react',
  'clsx',
  'tailwind-merge',
  'date-fns',
];

let ok = true;
for (const pkg of required) {
  try {
    requireFromRoot.resolve(pkg);
    // eslint-disable-next-line no-console
    console.log(`OK  - ${pkg}`);
  } catch (e) {
    ok = false;
    // eslint-disable-next-line no-console
    console.error(`MISS - ${pkg}`);
  }
}

process.exit(ok ? 0 : 1);


