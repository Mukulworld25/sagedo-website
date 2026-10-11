-- ==============================================================================
-- SAGE DO — Supabase Schema & RLS for Demo Requests, Testimonials & Storage
-- ==============================================================================

-- 1. DEMO REQUESTS TABLE (TASK 1)
-- Stores requests from /free-demo
CREATE TABLE IF NOT EXISTS public.demo_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    city TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    website TEXT,
    interests TEXT[] DEFAULT '{}',
    note TEXT,
    consent BOOLEAN NOT NULL DEFAULT false,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    referrer TEXT,
    status TEXT NOT NULL DEFAULT 'new'
);

ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- RLS: Anonymous INSERT only, NO public SELECT
DROP POLICY IF EXISTS "Allow anonymous insert on demo_requests" ON public.demo_requests;
CREATE POLICY "Allow anonymous insert on demo_requests"
ON public.demo_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Explicitly disallow public SELECT (only service_role/admin can view)
DROP POLICY IF EXISTS "Disallow public select on demo_requests" ON public.demo_requests;
-- (Default with RLS enabled and no SELECT policy is denied access to anon/authenticated)

-- Service role full access
DROP POLICY IF EXISTS "Allow service role full access on demo_requests" ON public.demo_requests;
CREATE POLICY "Allow service role full access on demo_requests"
ON public.demo_requests FOR ALL
TO service_role
USING (true)
WITH CHECK (true);


-- 2. TESTIMONIALS TABLE (TASK 2)
-- Stores user reviews from /share-your-experience
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    business TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    written_review TEXT NOT NULL,
    media_url TEXT,
    media_type TEXT CHECK (media_type IN ('image', 'video')),
    consent BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'pending'
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS: Anonymous INSERT only
DROP POLICY IF EXISTS "Allow anonymous insert on testimonials" ON public.testimonials;
CREATE POLICY "Allow anonymous insert on testimonials"
ON public.testimonials FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Public SELECT for approved testimonials ONLY
DROP POLICY IF EXISTS "Allow public read on approved testimonials" ON public.testimonials;
CREATE POLICY "Allow public read on approved testimonials"
ON public.testimonials FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- Service role full access
DROP POLICY IF EXISTS "Allow service role full access on testimonials" ON public.testimonials;
CREATE POLICY "Allow service role full access on testimonials"
ON public.testimonials FOR ALL
TO service_role
USING (true)
WITH CHECK (true);


-- 3. SUPABASE STORAGE BUCKET FOR TESTIMONIAL MEDIA (TASK 2)
-- Bucket for review photos (<= 5MB) and videos (<= 50MB)
INSERT INTO storage.buckets (id, name, public)
VALUES ('testimonials', 'testimonials', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Anonymous uploads allowed to testimonials bucket
DROP POLICY IF EXISTS "Allow anonymous uploads to testimonials bucket" ON storage.objects;
CREATE POLICY "Allow anonymous uploads to testimonials bucket"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'testimonials');

-- Storage RLS: Public read access to testimonials media
DROP POLICY IF EXISTS "Allow public read from testimonials bucket" ON storage.objects;
CREATE POLICY "Allow public read from testimonials bucket"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'testimonials');
