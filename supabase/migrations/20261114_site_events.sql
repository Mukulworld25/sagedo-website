-- ============================================================================
-- Migration: Additive First-Party Site Events Telemetry Table
-- Date: 2026-11-14
-- Phase: SAGEDO Conversion Architecture Phase 1
-- Compliance: Digital Personal Data Protection Act, 2023 (DPDP Act)
--
-- STRICT PRIVACY & ISOLATION GUARANTEES:
-- - Purely additive: creates only `public.site_events`. Existing tables untouched.
-- - Zero PII: No IP addresses, no IP hashes, no user agents, no free-text fields.
-- - Row Level Security (RLS) enabled with ZERO policies for anon / authenticated roles.
-- - Ingestion via serverless backend utilizing the Supabase service-role key.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.site_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name TEXT NOT NULL,
    persona TEXT,
    chooser_need TEXT,
    chooser_budget TEXT,
    chooser_urgency TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Optimize query paths for telemetry aggregation and time-series reporting
CREATE INDEX IF NOT EXISTS idx_site_events_event_name ON public.site_events (event_name);
CREATE INDEX IF NOT EXISTS idx_site_events_created_at_desc ON public.site_events (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.site_events ENABLE ROW LEVEL SECURITY;

-- Explicit lockdown: Ensure no public access through anon or authenticated roles
-- (Default with RLS enabled and 0 policies blocks all direct REST API access from client)
