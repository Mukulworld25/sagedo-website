import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zsevqsmpvgoipwlhzjoy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZXZxc21wdmdvaXB3bGh6am95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NTM1MTIsImV4cCI6MzkzNjMzNzE1OX0.Kmz9bPBNy7tWHNDV8S2UMtoqpd38eltA1pzY2vRK434';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
