import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zrdnrpbhqzhmebgralku.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
  console.warn('VITE_SUPABASE_ANON_KEY is not set. Please add it to your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getAuthHeaders() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  console.log('🔐 getAuthHeaders - Session:', session ? 'exists' : 'null', 'Error:', error);
  console.log('🔑 Access token:', session?.access_token ? `${session.access_token.substring(0, 20)}...` : 'MISSING');
  
  if (!session?.access_token) {
    console.error('⚠️ No access token available! User may need to login again.');
  }
  
  return {
    'Authorization': `Bearer ${session?.access_token || ''}`,
    'apikey': supabaseAnonKey,
    'Content-Type': 'application/json',
  };
}
