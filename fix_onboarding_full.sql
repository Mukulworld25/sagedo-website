-- COMPREHENSIVE FIX FOR ONBOARDING & REWARDS
-- Run this in Supabase SQL Editor to guarantee everything works.

-- 1. Ensure 'users' table has 'token_balance' (Critical for rewards)
ALTER TABLE users ADD COLUMN IF NOT EXISTS token_balance INTEGER DEFAULT 0 NOT NULL;

-- 2. Ensure 'users' table has all onboarding columns
ALTER TABLE users ADD COLUMN IF NOT EXISTS profession VARCHAR;
ALTER TABLE users ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS gender VARCHAR;
ALTER TABLE users ADD COLUMN IF NOT EXISTS ai_proficiency VARCHAR;
ALTER TABLE users ADD COLUMN IF NOT EXISTS mobile_number VARCHAR;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_onboarding_completed BOOLEAN DEFAULT false NOT NULL;

-- 3. Ensure 'token_transactions' table exists (Critical for transaction history)
CREATE TABLE IF NOT EXISTS token_transactions (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar NOT NULL REFERENCES users(id),
  amount integer NOT NULL,
  type varchar(50) NOT NULL,
  description text NOT NULL,
  created_at timestamp DEFAULT now()
);

-- 4. Enable RLS for security (Optional but good practice)
ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;

-- 5. Fix potential sequence issues by defaulting dates
ALTER TABLE users ALTER COLUMN created_at SET DEFAULT now();

-- 6. Verify everything exists
SELECT 
  table_name, 
  column_name 
FROM information_schema.columns 
WHERE table_name IN ('users', 'token_transactions')
  AND column_name IN ('token_balance', 'profession', 'amount', 'type');
