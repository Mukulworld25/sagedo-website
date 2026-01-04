-- LAUNCH READINESS CLEANUP
-- Run this script to clear "Test Data" before going live.
-- SAFETY: This script deletes TRANSACTIONAL data but KEEPS your Services and Admin account.

-- ==============================================================================
-- 1. DELETE TRANSACTIONAL DATA (Orders, Logs, Chats)
--    We use TRUNCATE for speed and to reset ID counters (if serial).
--    CASCADE ensures linked data (like order_activities) is also removed.
-- ==============================================================================

TRUNCATE TABLE public.order_activities, public.orders CASCADE;
TRUNCATE TABLE public.token_transactions CASCADE;
TRUNCATE TABLE public.feedbacks;
TRUNCATE TABLE public.contact_messages;
TRUNCATE TABLE public.site_visits;
TRUNCATE TABLE public.used_emails;
TRUNCATE TABLE public.sessions;

-- ==============================================================================
-- 2. RESET USER DATA (OPTIONAL - COMMENTED OUT BY DEFAULT)
--    If you want to keep your Admin account, DO NOT run this section blindly.
--    Only un-comment if you want to delete ALL users except Admin.
-- ==============================================================================

-- DELETE FROM public.users WHERE is_admin = false;

-- ==============================================================================
-- DONE: Your database is clean and ready for real customers.
-- ==============================================================================
