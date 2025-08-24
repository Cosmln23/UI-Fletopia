-- Fleetopia Migration: 005_rls_policies_zero_trust
-- Purpose: Enable RLS and comprehensive policies with subscription gating

BEGIN;

-- Ensure required extensions for triggers already present
CREATE EXTENSION IF NOT EXISTS moddatetime;

-- Add subscription status to profiles if missing
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='profiles' AND column_name='subscription_status'
  ) THEN
    ALTER TABLE public.profiles
      ADD COLUMN subscription_status public.subscription_status NOT NULL DEFAULT 'free';
  END IF;
END $$;

-- Enable RLS on all relevant tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.geocoding_cache ENABLE ROW LEVEL SECURITY;

-- PROFILES: users can read/update their own profile
DROP POLICY IF EXISTS profiles_select_own ON public.profiles;
CREATE POLICY profiles_select_own ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS profiles_update_own ON public.profiles;
CREATE POLICY profiles_update_own ON public.profiles
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS profiles_insert_self ON public.profiles;
CREATE POLICY profiles_insert_self ON public.profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- LOADS
-- Owner full access (CRUD)
DROP POLICY IF EXISTS loads_select_owner ON public.loads;
CREATE POLICY loads_select_owner ON public.loads
  FOR SELECT USING (created_by = auth.uid());

DROP POLICY IF EXISTS loads_insert_owner ON public.loads;
CREATE POLICY loads_insert_owner ON public.loads
  FOR INSERT WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS loads_update_owner ON public.loads;
CREATE POLICY loads_update_owner ON public.loads
  FOR UPDATE USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS loads_delete_owner ON public.loads;
CREATE POLICY loads_delete_owner ON public.loads
  FOR DELETE USING (created_by = auth.uid());

-- Carriers can view only posted loads if subscription active
DROP POLICY IF EXISTS loads_select_carrier_posted_sub ON public.loads;
CREATE POLICY loads_select_carrier_posted_sub ON public.loads
  FOR SELECT USING (
    status = 'posted'::public.load_status
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.role = 'carrier'::public.user_role
        AND p.subscription_status IN ('active'::public.subscription_status, 'trialing'::public.subscription_status)
    )
  );

-- BIDS
-- Carriers with active subscription can create bids on posted loads; can see their own bids
DROP POLICY IF EXISTS bids_select_own ON public.bids;
CREATE POLICY bids_select_own ON public.bids
  FOR SELECT USING (bidder_id = auth.uid());

DROP POLICY IF EXISTS bids_insert_carrier_active ON public.bids;
CREATE POLICY bids_insert_carrier_active ON public.bids
  FOR INSERT WITH CHECK (
    bidder_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.role = 'carrier'::public.user_role
        AND p.subscription_status IN ('active'::public.subscription_status, 'trialing'::public.subscription_status)
    )
    AND EXISTS (
      SELECT 1 FROM public.loads l
      WHERE l.id = load_id
        AND l.status = 'posted'::public.load_status
        AND (l.created_by IS NULL OR l.created_by <> auth.uid())
    )
  );

-- Bidders can update/delete their own pending bids
DROP POLICY IF EXISTS bids_update_own_pending ON public.bids;
CREATE POLICY bids_update_own_pending ON public.bids
  FOR UPDATE USING (bidder_id = auth.uid() AND status = 'pending'::public.bid_status)
  WITH CHECK (bidder_id = auth.uid() AND status = 'pending'::public.bid_status);

DROP POLICY IF EXISTS bids_delete_own_pending ON public.bids;
CREATE POLICY bids_delete_own_pending ON public.bids
  FOR DELETE USING (bidder_id = auth.uid() AND status = 'pending'::public.bid_status);

-- Shippers can view bids on their own loads
DROP POLICY IF EXISTS bids_select_shipper_own_loads ON public.bids;
CREATE POLICY bids_select_shipper_own_loads ON public.bids
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.loads l
      WHERE l.id = load_id AND l.created_by = auth.uid()
    )
  );

-- DEALS: only participants (shipper who owns the load, or carrier on the deal)
DROP POLICY IF EXISTS deals_select_participants ON public.deals;
CREATE POLICY deals_select_participants ON public.deals
  FOR SELECT USING (
    carrier_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.loads l WHERE l.id = load_id AND l.created_by = auth.uid()
    )
  );

-- Shipper creates deals for loads they own
DROP POLICY IF EXISTS deals_insert_shipper ON public.deals;
CREATE POLICY deals_insert_shipper ON public.deals
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.loads l
      WHERE l.id = load_id AND l.created_by = auth.uid()
    )
  );

-- Optional: updates limited to participants
DROP POLICY IF EXISTS deals_update_participants ON public.deals;
CREATE POLICY deals_update_participants ON public.deals
  FOR UPDATE USING (
    carrier_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.loads l WHERE l.id = load_id AND l.created_by = auth.uid())
  ) WITH CHECK (
    carrier_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.loads l WHERE l.id = load_id AND l.created_by = auth.uid())
  );

-- CHAT: only deal participants can read/write
DROP POLICY IF EXISTS chat_select_participants ON public.chat_messages;
CREATE POLICY chat_select_participants ON public.chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.deals d
      JOIN public.loads l ON l.id = d.load_id
      WHERE d.id = deal_id
        AND (d.carrier_id = auth.uid() OR l.created_by = auth.uid())
    )
  );

DROP POLICY IF EXISTS chat_insert_participants ON public.chat_messages;
CREATE POLICY chat_insert_participants ON public.chat_messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.deals d
      JOIN public.loads l ON l.id = d.load_id
      WHERE d.id = deal_id
        AND (d.carrier_id = auth.uid() OR l.created_by = auth.uid())
    )
  );

-- GEOCODING CACHE: default deny (no public policies). Service role bypasses RLS.

COMMIT;



