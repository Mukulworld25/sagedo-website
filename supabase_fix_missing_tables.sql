-- It seems the 'order_activities' table was never created (migration didn't run).
-- Run this script to Create the table AND secure it.

CREATE TABLE IF NOT EXISTS order_activities (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id varchar NOT NULL REFERENCES orders(id),
  type varchar(50) NOT NULL,
  title varchar(255),
  message text,
  is_read boolean DEFAULT false,
  created_by varchar(50) DEFAULT 'system',
  created_at timestamp DEFAULT now()
);

-- Now Enable RLS
ALTER TABLE order_activities ENABLE ROW LEVEL SECURITY;

-- Also try these again just in case (IF NOT EXISTS prevents errors)
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE used_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;
