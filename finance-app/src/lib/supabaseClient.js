import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or Anon Key is missing. Check your .env file.');
}

// Reuse existing client if already initialized (prevents "Multiple GoTrueClient instances" warning during HMR)
const supabase = (typeof window !== 'undefined' && window._supabase)
    ? window._supabase
    : createClient(supabaseUrl, supabaseAnonKey);

if (typeof window !== 'undefined') {
    window._supabase = supabase;
}

export { supabase };
