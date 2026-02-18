import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Email do novo administrador
const EMAIL = 'trasforaagora@gmail.com';
const PASSWORD = 'Admin' + Math.random().toString(36).slice(-8) + '!'; // Senha temporária aleatória

async function setupAdmin() {
  console.log('\n🚀 Adicionando novo Administrador: ' + EMAIL);
  console.log('═══════════════════════════════════════════════════\n');

  // 1. Ler .env.local para pegar a URL
  const ENV_FILE = join(__dirname, '..', '.env.local');
  let envContent = '';
  try {
    envContent = readFileSync(ENV_FILE, 'utf-8');
  } catch (e) {
    console.error('❌ Arquivo .env.local não encontrado!');
    return;
  }

  const lines = envContent.split('\n');
  const config = {};
  lines.forEach(line => {
    const [key, ...value] = line.trim().split('=');
    if (key && value.length) config[key.trim()] = value.join('=').trim();
  });

  const SUPABASE_URL = config.VITE_SUPABASE_URL || config.SUPABASE_URL;
  const SERVICE_ROLE_KEY = config.SUPABASE_SERVICE_ROLE_KEY || config.SERVICE_ROLE_KEY;

  if (!SUPABASE_URL) {
    console.error('❌ VITE_SUPABASE_URL não encontrada no .env.local');
    return;
  }

  if (!SERVICE_ROLE_KEY) {
    console.log('⚠️  SUPABASE_SERVICE_ROLE_KEY não encontrada no .env.local');
    console.log('💡 Para criar usuários automaticamente, eu preciso da "service_role" key.');
    console.log('   Você pode encontrá-la em: Project Settings -> API -> service_role');
    console.log('\n--- ALTERNATIVA (SQL) ---\n');
    console.log('Se você preferir, execute este SQL no Editor do Supabase:\n');
    console.log('-- 1. Crie o usuário no menu "Authentication" -> "Users" -> "Add User"');
    console.log('-- 2. Depois de criado, copie o ID dele e execute:');
    console.log(`INSERT INTO public.admins (user_id, role, is_active) 
VALUES ('COLE_O_ID_DO_USUARIO_AQUI', 'admin', true)
ON CONFLICT (user_id) DO UPDATE SET role = 'admin', is_active = true;`);
    return;
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    console.log('⏳ Criando usuário no Auth...');
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email: EMAIL,
      password: PASSWORD,
      email_confirm: true
    });

    if (userError) {
      if (userError.message.includes('already registered')) {
        console.log('ℹ️  Usuário já existe no Auth. Buscando ID...');
        const { data: users, error: listError } = await supabase.auth.admin.listUsers();
        const existingUser = users?.users.find(u => u.email === EMAIL);
        
        if (existingUser) {
          await makeAdmin(supabase, existingUser.id);
        } else {
          console.error('❌ Não foi possível encontrar o ID do usuário existente.');
        }
      } else {
        console.error('❌ Erro ao criar usuário:', userError.message);
      }
    } else {
      console.log('✅ Usuário criado com sucesso!');
      console.log('🔑 Senha temporária:', PASSWORD);
      await makeAdmin(supabase, userData.user.id);
    }
  } catch (err) {
    console.error('❌ Erro inesperado:', err.message);
  }
}

async function makeAdmin(supabase, userId) {
  console.log('⏳ Adicionando à tabela de admins...');
  const { error: adminError } = await supabase
    .from('admins')
    .insert({
      user_id: userId,
      role: 'admin',
      is_active: true
    });

  if (adminError) {
    if (adminError.code === '23505') { // Unique violation
       console.log('✅ O usuário já é um administrador!');
    } else {
      console.error('❌ Erro ao adicionar admin:', adminError.message);
    }
  } else {
    console.log('🎉 SUCESSO! ' + EMAIL + ' agora é um administrador.');
  }
}

setupAdmin();
