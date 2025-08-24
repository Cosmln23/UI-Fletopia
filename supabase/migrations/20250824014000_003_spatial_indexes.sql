-- Fleetopia Migration: 003_spatial_indexes
-- Purpose: Spatial (GIST) and B-tree indexes for performance

BEGIN;

-- Ensure extensions available
CREATE EXTENSION IF NOT EXISTS postgis;

-- GIST indexes for GEOGRAPHY columns (idempotent)
CREATE INDEX IF NOT EXISTS idx_loads_pickup_geo_gist
  ON public.loads USING GIST (pickup_location_geo);

CREATE INDEX IF NOT EXISTS idx_loads_delivery_geo_gist
  ON public.loads USING GIST (delivery_location_geo);

CREATE INDEX IF NOT EXISTS idx_profiles_home_base_geo_gist
  ON public.profiles USING GIST (home_base_geo);

-- B-tree indexes for frequent query patterns
-- loads(status, created_by) acts as shipper filter + status filter
CREATE INDEX IF NOT EXISTS idx_loads_status_created_by
  ON public.loads (status, created_by);

-- bids(load_id, status) for pending/accepted by load
CREATE INDEX IF NOT EXISTS idx_bids_load_status
  ON public.bids (load_id, status);

-- chat_messages(deal_id, created_at) for timeline per deal
CREATE INDEX IF NOT EXISTS idx_chat_messages_deal_created_at
  ON public.chat_messages (deal_id, created_at DESC);

COMMIT;


