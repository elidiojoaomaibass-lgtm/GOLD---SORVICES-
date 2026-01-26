
import { createClient } from '@supabase/supabase-js';

// As variáveis devem ser configuradas no ambiente de deploy
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!supabase) {
  console.warn("Supabase não configurado. O sistema usará LocalStorage como fallback.");
}
