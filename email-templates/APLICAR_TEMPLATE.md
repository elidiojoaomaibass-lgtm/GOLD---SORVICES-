# 📧 APLICAR TEMPLATE DE EMAIL PERSONALIZADO

## 🎨 Template Criado!

Arquivo: `email-templates/magic-link.html`

---

## 🚀 COMO APLICAR NO SUPABASE

### **PASSO 1: Abrir Configurações**

1. Vá em: https://supabase.com/dashboard/project/oaclmhznrdorugnvdatz/auth/templates

2. Clique em **"Magic Link"** (ou "Email OTP")

---

### **PASSO 2: Copiar Template**

1. Abra o arquivo: `email-templates/magic-link.html`

2. Copie **TODO** o conteúdo (Ctrl+A, Ctrl+C)

---

### **PASSO 3: Colar no Supabase**

1. No campo **"Email Template (HTML)"**, delete o conteúdo antigo

2. Cole o novo template

3. Verifique se `{{ .Token }}` está presente (é onde o código aparece)

---

### **PASSO 4: Configurar Assunto**

No campo **"Subject"**, coloque:

```
🔐 Código de Acesso MemberHub Admin - {{ .Token }}
```

Ou mais simples:

```
Seu código de verificação: {{ .Token }}
```

---

### **PASSO 5: Salvar**

1. Clique em **"Save"** no final da página

2. Aguarde a confirmação

---

## 🎨 PREVIEW DO EMAIL

O usuário vai receber um email assim:

```
┌──────────────────────────────────┐
│                                  │
│        🔥 MEMBERHUB              │
│     Admin Dashboard Access       │
│                                  │
├──────────────────────────────────┤
│                                  │
│   🔐 Código de Verificação       │
│                                  │
│  Use o código abaixo para        │
│  acessar o painel administrativo │
│                                  │
│  ╔════════════════════╗          │
│  ║                    ║          │
│  ║     1 2 3 4 5 6    ║          │
│  ║                    ║          │
│  ╚════════════════════╝          │
│                                  │
│  ⏰ Validade: 60 minutos          │
│  🔒 Código de uso único          │
│  ⚠️ Não solicitou? Ignore        │
│                                  │
├──────────────────────────────────┤
│        MemberHub                 │
│   Admin Dashboard • 2026         │
└──────────────────────────────────┘
```

---

## ✨ CARACTERÍSTICAS DO TEMPLATE

✅ **Design moderno** com gradientes  
✅ **Código em destaque** (48px, roxo)  
✅ **Responsivo** (mobile-friendly)  
✅ **Informações de segurança** claras  
✅ **Cores do sistema** (roxo/violeta)  
✅ **Ícones** para melhor UX  
✅ **Footer profissional**  

---

## 🎨 PERSONALIZAR CORES

### **Para mudar as cores principais:**

1. Gradiente do header:
   ```css
   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
   ```

2. Cor do código:
   ```css
   color: #7c3aed; /* Roxo violeta */
   ```

3. Border do código:
   ```css
   border: 3px solid #7c3aed;
   ```

---

## 🧪 TESTAR

Depois de aplicar o template:

1. Vá para: http://localhost:3001
2. Faça login com `xrl8.bi@gmail.com`
3. Verifique o email recebido
4. ✅ Deve ter o novo design!

---

## 📝 VARIÁVEIS DISPONÍVEIS

O Supabase fornece estas variáveis:

- `{{ .Token }}` - O código de 6 dígitos
- `{{ .SiteURL }}` - URL do seu site
- `{{ .ConfirmationURL }}` - Link de confirmação

**No nosso caso, usamos apenas `{{ .Token }}`**

---

## ⚠️ IMPORTANTE

- ✅ NÃO remova `{{ .Token }}`
- ✅ Mantenha o HTML válido
- ✅ Teste em diferentes clientes de email
- ✅ Verifique se não está indo para spam

---

## 🔗 LINK DIRETO

**Aplicar template:**
https://supabase.com/dashboard/project/oaclmhznrdorugnvdatz/auth/templates

---

**Status:** ✅ Template pronto!  
**Ação:** Copie e cole no Supabase 🚀
