-- Create token_transactions table if it doesn't exist
CREATE TABLE IF NOT EXISTS token_transactions (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar NOT NULL REFERENCES users(id),
  amount integer NOT NULL,
  type varchar(50) NOT NULL,
  description text NOT NULL,
  created_at timestamp DEFAULT now()
);

-- Fix created_at default for users table if needed (sometimes causes issues)
ALTER TABLE users ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE users ALTER COLUMN updated_at SET DEFAULT now();

-- Verify existence
SELECT tablename FROM pg_tables WHERE tablename = 'token_transactions';
