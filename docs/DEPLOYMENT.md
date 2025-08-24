## Deployment – GitHub Actions + Vercel

### GitHub Actions
- CI: `.github/workflows/ci.yml` – lint, typecheck, test, build on `main` and `develop` (PR inclus)
- Deploy: `.github/workflows/deploy.yml` – build + deploy pe `main` cu Vercel Action

Secrets necesare în repo (Settings → Secrets → Actions):
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Vercel Configuration
- `vercel.json` – Next.js, `buildCommand: npm run build`, `installCommand: npm ci`
- Env vars în Vercel (Project Settings → Environment Variables):
  - `NEXT_PUBLIC_API_BASE_URL`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_SECRET_KEY` (Secret)
  - `OPENAI_API_KEY` (Secret)

### Pre-deployment checks
- Script: `npm run deploy:check` – rulează typecheck, lint, test, env check, build

### Branch Protection (recomandat)
- Protejează `main` cu:
  - Require PR reviews
  - Required status checks: CI (lint, typecheck, test, build)
  - No direct pushes to `main`


