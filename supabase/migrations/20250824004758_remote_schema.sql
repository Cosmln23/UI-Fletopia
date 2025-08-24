-- Fleetopia Migration: 001_extensions_and_enums
-- Purpose: Enable required extensions and define core ENUM types
-- Note: Idempotent guards included to avoid failures on re-apply

BEGIN;

-- Extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS moddatetime;

-- Helper to create enum if missing
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'user_role' AND n.nspname = 'public'
  ) THEN
    CREATE TYPE public.user_role AS ENUM ('admin', 'shipper', 'carrier');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'load_status' AND n.nspname = 'public'
  ) THEN
    CREATE TYPE public.load_status AS ENUM (
      'posted',
      'accepted',
      'in_transit',
      'delivered',
      'canceled'
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'bid_status' AND n.nspname = 'public'
  ) THEN
    CREATE TYPE public.bid_status AS ENUM (
      'pending',
      'accepted',
      'rejected',
      'withdrawn'
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'subscription_status' AND n.nspname = 'public'
  ) THEN
    CREATE TYPE public.subscription_status AS ENUM (
      'free',
      'trialing',
      'active',
      'past_due',
      'canceled'
    );
  END IF;
END $$;

COMMIT;

