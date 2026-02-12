-- Add missing onboarding columns to users table
-- Run this in Supabase SQL Editor

ALTER TABLE users ADD COLUMN IF NOT EXISTS profession VARCHAR;
ALTER TABLE users ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS gender VARCHAR;
ALTER TABLE users ADD COLUMN IF NOT EXISTS ai_proficiency VARCHAR;
ALTER TABLE users ADD COLUMN IF NOT EXISTS mobile_number VARCHAR;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_onboarding_completed BOOLEAN DEFAULT false NOT NULL;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name IN ('profession', 'age', 'gender', 'ai_proficiency', 'mobile_number', 'is_onboarding_completed');
