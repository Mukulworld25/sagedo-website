-- Run this script in the Supabase SQL Editor to secure your database.

-- 1. Enable Row Level Security (RLS) on all tables (Fixes Security Warnings)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE used_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- 2. Create Basic Policies (Allows Backend to access, blocks public Anon access)
-- Note: The Service Role (Backend) bypasses RLS automatically, so no special policy needed for it.
-- These commands ensure that NO one can access data publicly via the API API unless explicitly allowed.

-- Example: Allow reading services publicly (if you want services to be public via Supabase Client)
CREATE POLICY "Public Services Read" ON services FOR SELECT USING (true);

-- Example: Allow users to read their own data (If using Supabase Auth, which we are largely bypassing for Custom Auth)
-- Since we use a Custom Backend, we generally keep RLS enabled with NO policies for Anon, which effectively "locks down" the DB.

-- 3. Safety Check
-- If your app stops working after this, run:
-- ALTER TABLE users DISABLE ROW LEVEL SECURITY; -- (and so on for other tables)
