## Supabase + pgBouncer – Setup

### Environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- (server-only) `SUPABASE_SERVICE_ROLE_KEY` – numai în backend

### Connection pooling (pgBouncer)
- În producție, activați `Connection Pooling` (pgBouncer) din Supabase Dashboard → Database → Connection Pooling
- Folosiți stringul `pooler` pentru conexiuni serverless; limitați `max_connections` în app dacă aplicați conexiuni directe

### Local development
- Config exemplu în `supabase/config.toml`
- Rulați `supabase start` pentru a porni stack-ul local (dacă folosiți CLI)

### Health checks
- UI: `GET /api/health` verifică conectivitatea minimală la Supabase


