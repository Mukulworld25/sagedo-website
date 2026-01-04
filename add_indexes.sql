-- ADD MISSING INDEXES
-- Run this script in Supabase SQL Editor to fix "Unindexed foreign keys" performance warnings.

-- 1. Index for Feedbacks (User ID)
CREATE INDEX IF NOT EXISTS idx_feedbacks_user_id ON public.feedbacks(user_id);

-- 2. Index for Order Activities (Order ID)
CREATE INDEX IF NOT EXISTS idx_order_activities_order_id ON public.order_activities(order_id);

-- 3. Index for Orders (User ID)
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);

-- 4. Index for Token Transactions (User ID)
CREATE INDEX IF NOT EXISTS idx_token_transactions_user_id ON public.token_transactions(user_id);

-- ==============================================================================
-- DONE: Indexes created to speed up Lookups and Joins.
-- ==============================================================================
