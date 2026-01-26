# Deploy na Vercel - MemberHub

## 📋 Configuração Completa

O projeto está **100% configurado** para deploy na Vercel.

## 📦 Arquivos de Configuração

### `vercel.json`
Configuração principal do projeto com:
- Framework: Vite
- Output: `dist/`
- Suporte a SPA routing (todas as rotas redirecionam para `index.html`)

### `.vercelignore`
Define quais arquivos não serão enviados no deploy (similar ao `.gitignore`)

### `.env.example`
Template das variáveis de ambiente necessárias

## 🚀 Como Fazer Deploy

### Opção 1: Deploy via GitHub (Recomendado)

1. **Push do código para GitHub**
   ```bash
   git add .
   git commit -m "Configuração para Vercel"
   git push origin main
   ```

2. **Conectar à Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Add New Project"
   - Importe seu repositório do GitHub
   - A Vercel detectará automaticamente as configurações do Vite

3. **Configurar Variáveis de Ambiente**
   Em "Environment Variables", adicione:
   ```
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   VITE_GEMINI_API_KEY=sua_chave_api_do_gemini
   ```

4. **Deploy!**
   - Clique em "Deploy"
   - Pronto! A cada push, a Vercel fará deploy automático

### Opção 2: Deploy via CLI

1. **Login na Vercel**
   ```bash
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Deploy em Produção**
   ```bash
   vercel --prod
   ```

## ⚙️ Variáveis de Ambiente

**Importante:** Configure estas variáveis no dashboard da Vercel antes do deploy:

| Variável | Descrição |
|----------|-----------|
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima do Supabase |
| `VITE_GEMINI_API_KEY` | Chave API do Google Gemini |

## ✅ Build Testado

Build de produção testado localmente com sucesso:
- ✓ 1749 módulos transformados
- ✓ Bundle: 445.45 kB (gzip: 122.47 kB)
- ✓ Tempo de build: ~3 minutos

## 📁 Estrutura de Deploy

```
dist/
├── index.html (2.20 kB)
└── assets/
    └── index-Cf_l_h-R.js (445.45 kB)
```

## 🔒 Segurança

- ✓ `.env.local` nunca é enviado ao deploy (está no `.vercelignore`)
- ✓ Todas as chaves são configuradas como variáveis de ambiente na Vercel
- ✓ Build otimizado para produção com minificação

## 📊 Configuração Automática da Vercel

A Vercel detectará automaticamente:
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Dev Command: `npm run dev`

## 🎯 Próximos Passos

1. Configure as variáveis de ambiente no painel da Vercel
2. Faça push do código para GitHub
3. Conecte seu repositório à Vercel
4. Aguarde o primeiro deploy (automático)
5. Acesse seu app no domínio fornecido pela Vercel!

---

**Pronto para produção! 🚀**
