import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zrdnrpbhqzhmebgralku.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseAnonKey) {
  console.warn('VITE_SUPABASE_ANON_KEY is not set. Please add it to your .env file.');
}

if (!supabaseServiceRoleKey) {
  console.warn('VITE_SUPABASE_SERVICE_ROLE_KEY is not set. Admin features may not work.');
}

// Regular client for auth and user operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client with service role key (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function getAuthHeaders() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('❌ [getAuthHeaders] Error getting session:', error);
  }
  
  if (!session) {
    console.warn('⚠️ [getAuthHeaders] No active session found');
  } else {
    console.log('✅ [getAuthHeaders] Session found, user:', session.user.email);
  }
  
  return {
    'Authorization': `Bearer ${session?.access_token || ''}`,
    'apikey': supabaseAnonKey,
    'Content-Type': 'application/json',
  };
}
