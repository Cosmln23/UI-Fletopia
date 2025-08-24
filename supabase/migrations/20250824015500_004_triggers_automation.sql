-- Fleetopia Migration: 004_triggers_automation
-- Purpose: Auto-create profile on new auth.users and ensure updated_at triggers

BEGIN;

-- Ensure required extensions
CREATE EXTENSION IF NOT EXISTS moddatetime;

-- 1) Function to handle new user creation -> auto profile
-- Reads role from raw_user_meta_data.user_type (fallback to 'carrier')
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role_text text;
  v_role public.user_role;
  v_full_name text;
  v_company text;
BEGIN
  -- Extract metadata
  BEGIN
    v_role_text := COALESCE(NEW.raw_user_meta_data->>'user_type', NEW.raw_user_meta_data->>'role', 'carrier');
    v_full_name := NEW.raw_user_meta_data->>'full_name';
    v_company := NEW.raw_user_meta_data->>'company';
  EXCEPTION WHEN others THEN
    v_role_text := 'carrier';
    v_full_name := NULL;
    v_company := NULL;
  END;

  -- Coerce to ENUM safely
  IF v_role_text = 'admin' THEN
    v_role := 'admin'::public.user_role;
  ELSIF v_role_text = 'shipper' THEN
    v_role := 'shipper'::public.user_role;
  ELSE
    v_role := 'carrier'::public.user_role;
  END IF;

  -- Insert profile if missing (idempotent)
  INSERT INTO public.profiles (user_id, role, full_name, company_name)
  VALUES (NEW.id, v_role, v_full_name, v_company)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- 2) Attach trigger to auth.users (AFTER INSERT)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

-- 3) Ensure updated_at triggers using moddatetime on all tables with updated_at
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='updated_at')
     AND NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='profiles_set_updated_at') THEN
    CREATE TRIGGER profiles_set_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='loads' AND column_name='updated_at')
     AND NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='loads_set_updated_at') THEN
    CREATE TRIGGER loads_set_updated_at
    BEFORE UPDATE ON public.loads
    FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='bids' AND column_name='updated_at')
     AND NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='bids_set_updated_at') THEN
    CREATE TRIGGER bids_set_updated_at
    BEFORE UPDATE ON public.bids
    FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='deals' AND column_name='updated_at')
     AND NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='deals_set_updated_at') THEN
    CREATE TRIGGER deals_set_updated_at
    BEFORE UPDATE ON public.deals
    FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);
  END IF;
END $$;

COMMIT;


