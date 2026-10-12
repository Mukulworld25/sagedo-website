import { createClient, SupabaseClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://zsevqsmpvgoipwlhzjoy.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZXZxc21wdmdvaXB3bGh6am95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NTM1MTIsImV4cCI6MzkzNjMzNzE1OX0.Kmz9bPBNy7tWHNDV8S2UMtoqpd38eltA1pzY2vRK434';

function getValidSupabaseConfig(): { url: string; key: string } {
  let url = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  let key = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

  // Validate URL: must start with http:// or https:// and not be a dummy value (like 'a')
  if (!url || !/^https?:\/\//i.test(url) || url.length < 10) {
    url = DEFAULT_SUPABASE_URL;
  }

  // Strip trailing slashes
  url = url.replace(/\/+$/, '');

  // Validate Key: must be a reasonably long token, not a dummy single letter
  if (!key || key.length < 20) {
    key = DEFAULT_SUPABASE_ANON_KEY;
  }

  return { url, key };
}

function initSupabase(): SupabaseClient {
  const { url, key } = getValidSupabaseConfig();
  try {
    return createClient(url, key);
  } catch (err) {
    console.warn('⚠️ Supabase client initialization warning:', err);
    try {
      return createClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_ANON_KEY);
    } catch (fallbackErr) {
      console.error('⚠️ Critical: Failed to initialize fallback Supabase client:', fallbackErr);
      // Safe no-op proxy so top-level module evaluation NEVER crashes the React application
      const mockHandler: ProxyHandler<any> = {
        get(_target, prop) {
          if (prop === 'from') {
            return () => ({
              insert: async () => ({ error: { message: 'Database client not connected' } }),
              select: () => ({
                eq: () => ({ order: async () => ({ data: [], error: null }) }),
                order: async () => ({ data: [], error: null })
              })
            });
          }
          if (prop === 'storage') {
            return {
              from: () => ({
                upload: async () => ({ error: { message: 'Storage client not connected' } }),
                getPublicUrl: () => ({ data: { publicUrl: '' } })
              })
            };
          }
          return () => Promise.resolve({ data: null, error: null });
        }
      };
      return new Proxy({} as SupabaseClient, mockHandler);
    }
  }
}

export const supabase = initSupabase();
