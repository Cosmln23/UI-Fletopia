#!/usr/bin/env node
const { execSync } = require('node:child_process');

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

try {
  console.log('1) Typecheck');
  run('npm run typecheck');

  console.log('2) Lint');
  run('npm run lint');

  console.log('3) Tests');
  run('npm run test');

  console.log('4) Env check');
  run('node scripts/check-env.js');

  console.log('5) Build');
  run('npm run build');

  console.log('Pre-deployment checks passed.');
} catch (e) {
  console.error('Pre-deployment checks failed.');
  process.exit(1);
}


