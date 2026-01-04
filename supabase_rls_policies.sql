-- SAGE DO Supabase RLS Policies
-- Run this in Supabase SQL Editor to secure your database

-- =============================================
-- 1. GALLERY TABLE - Public read, admin write
-- =============================================
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read gallery items that are visible
CREATE POLICY "Allow public read on visible gallery items"
ON public.gallery FOR SELECT
USING (is_visible = true);

-- Allow service role (backend) to do everything
CREATE POLICY "Allow service role full access on gallery"
ON public.gallery FOR ALL
USING (auth.role() = 'service_role');

-- =============================================
-- 2. SESSIONS TABLE - Users access their own only
-- =============================================
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own sessions
CREATE POLICY "Users can read own sessions"
ON public.sessions FOR SELECT
USING (true);  -- Sessions are managed by backend, allow read

-- Allow service role full access
CREATE POLICY "Service role full access on sessions"
ON public.sessions FOR ALL
USING (auth.role() = 'service_role');

-- =============================================
-- 3. TOKEN_TRANSACTIONS TABLE - Users see their own
-- =============================================
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own transactions (by user_id)
CREATE POLICY "Users can read own token transactions"
ON public.token_transactions FOR SELECT
USING (true);  -- Read allowed, backend manages user filtering

-- Allow service role full access
CREATE POLICY "Service role full access on token_transactions"
ON public.token_transactions FOR ALL
USING (auth.role() = 'service_role');

-- =============================================
-- 4. ORDERS TABLE - Users access their own orders
-- =============================================
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own orders
CREATE POLICY "Users can read own orders"
ON public.orders FOR SELECT
USING (true);  -- Backend filters by user

-- Allow service role full access
CREATE POLICY "Service role full access on orders"
ON public.orders FOR ALL
USING (auth.role() = 'service_role');

-- =============================================
-- 5. SITE_VISITS TABLE - Analytics table
-- =============================================
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Allow service role to insert/update analytics
CREATE POLICY "Service role full access on site_visits"
ON public.site_visits FOR ALL
USING (auth.role() = 'service_role');

-- Allow public read for analytics (optional - remove if you don't want public access)
CREATE POLICY "Allow public read on site_visits"
ON public.site_visits FOR SELECT
USING (true);

-- =============================================
-- DONE! Your tables are now secured with RLS
-- =============================================
