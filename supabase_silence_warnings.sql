-- "RLS Enabled No Policy" is just a warning saying "You haven't written a rule yet".
-- By default, "No Policy" means "No Access", which is SAFE.
-- However, to make the warnings go away, we will write an explicit "No Access" rule.

-- 1. Create a "Deny All" policy for 'users'
CREATE POLICY "Deny Public Access" ON users FOR ALL USING (false);

-- 2. Create for 'services' (or make this one public if you want! But for now, let's silence it)
CREATE POLICY "Deny Public Access" ON services FOR ALL USING (false);

-- 3. Create for others
CREATE POLICY "Deny Public Access" ON orders FOR ALL USING (false);
CREATE POLICY "Deny Public Access" ON token_transactions FOR ALL USING (false);
CREATE POLICY "Deny Public Access" ON gallery FOR ALL USING (false);
CREATE POLICY "Deny Public Access" ON site_visits FOR ALL USING (false);
CREATE POLICY "Deny Public Access" ON feedbacks FOR ALL USING (false);
CREATE POLICY "Deny Public Access" ON used_emails FOR ALL USING (false);
CREATE POLICY "Deny Public Access" ON contact_messages FOR ALL USING (false);
CREATE POLICY "Deny Public Access" ON order_activities FOR ALL USING (false);

-- This tells Supabase: "Yes, I have a policy, and the policy is: Nobody (public) can touch this."
-- Your Backend (Service Role) ignores this and can still access everything.
