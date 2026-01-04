-- OPTIMIZE RLS POLICIES
-- Run this script in the Supabase SQL Editor to fix Performance Warnings and Secure your data.

-- ==============================================================================
-- 1. CLEANUP: Drop all existing/redundant policies to fix "Multiple Permissive Policies"
-- ==============================================================================

-- Gallery
DROP POLICY IF EXISTS "Allow public read on visible gallery items" ON public.gallery;
DROP POLICY IF EXISTS "Allow service role full access on gallery" ON public.gallery;
DROP POLICY IF EXISTS "Deny Public Access" ON public.gallery;
DROP POLICY IF EXISTS "Service Role Full Access" ON public.gallery;
DROP POLICY IF EXISTS "Public Read Visible" ON public.gallery;

-- Sessions
DROP POLICY IF EXISTS "Users can read own sessions" ON public.sessions;
DROP POLICY IF EXISTS "Service role full access on sessions" ON public.sessions;
DROP POLICY IF EXISTS "Deny Public Access" ON public.sessions;

-- Token Transactions
DROP POLICY IF EXISTS "Users can read own token transactions" ON public.token_transactions;
DROP POLICY IF EXISTS "Service role full access on token_transactions" ON public.token_transactions;
DROP POLICY IF EXISTS "Deny Public Access" ON public.token_transactions;

-- Orders
DROP POLICY IF EXISTS "Users can read own orders" ON public.orders;
DROP POLICY IF EXISTS "Service role full access on orders" ON public.orders;
DROP POLICY IF EXISTS "Deny Public Access" ON public.orders;

-- Site Visits
DROP POLICY IF EXISTS "Service role full access on site_visits" ON public.site_visits;
DROP POLICY IF EXISTS "Allow public read on site_visits" ON public.site_visits;
DROP POLICY IF EXISTS "Deny Public Access" ON public.site_visits;


-- ==============================================================================
-- 2. OPTIMIZATION: Create new policies with (select auth.func()) wrapper
--    This fixes the "Auth RLS Initialization Plan" performance warning.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- A. GALLERY (Public Read, Admin Write)
-- ------------------------------------------------------------------------------
-- Policy 1: Service Role (Backend) can do anything
CREATE POLICY "Service Role Full Access" ON public.gallery
FOR ALL USING ((select auth.role()) = 'service_role');

-- Policy 2: Public can READ only (if visible)
CREATE POLICY "Public Read Visible" ON public.gallery
FOR SELECT USING (is_visible = true);


-- ------------------------------------------------------------------------------
-- B. SESSIONS (Backend Only)
-- ------------------------------------------------------------------------------
-- NOTE: Sessions table has no user_id, so "Users read own" is impossible/unsafe.
-- We restrict this strictly to the Backend (Service Role).
CREATE POLICY "Service Role Full Access" ON public.sessions
FOR ALL USING ((select auth.role()) = 'service_role');


-- ------------------------------------------------------------------------------
-- C. TOKEN TRANSACTIONS (Users read own, Admin manages)
-- ------------------------------------------------------------------------------
CREATE POLICY "Service Role Full Access" ON public.token_transactions
FOR ALL USING ((select auth.role()) = 'service_role');

CREATE POLICY "Users Read Own" ON public.token_transactions
FOR SELECT USING ((select auth.uid()::text) = user_id);


-- ------------------------------------------------------------------------------
-- D. ORDERS (Users read own, Admin manages)
-- ------------------------------------------------------------------------------
CREATE POLICY "Service Role Full Access" ON public.orders
FOR ALL USING ((select auth.role()) = 'service_role');

CREATE POLICY "Users Read Own" ON public.orders
FOR SELECT USING ((select auth.uid()::text) = user_id);


-- ------------------------------------------------------------------------------
-- E. SITE VISITS (Backend Only)
-- ------------------------------------------------------------------------------
-- Analytics are usually internal. If you need public insert, uncomment the next line.
-- CREATE POLICY "Public Insert" ON public.site_visits FOR INSERT WITH CHECK (true);

CREATE POLICY "Service Role Full Access" ON public.site_visits
FOR ALL USING ((select auth.role()) = 'service_role');


-- ==============================================================================
-- DONE: Performance optimized and Security tightened.
-- ==============================================================================
