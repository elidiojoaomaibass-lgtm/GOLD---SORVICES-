
import { createClient } from '@supabase/supabase-js';

// As variáveis devem ser configuradas no ambiente de deploy
// Vite expõe variáveis de ambiente via import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!supabase) {
  console.warn("⚠️ Supabase não configurado. O sistema usará LocalStorage como fallback.");
  console.warn("📝 Para habilitar sincronização, configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env.local");
} else {
  console.log("✅ Supabase conectado:", supabaseUrl);
}
