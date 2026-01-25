# 🚀 Guia Rápido - Deploy no Netlify

## ✅ Código já está no GitHub!
**Repositório:** https://github.com/italoandres/leche-lecha-identity

---

## 📋 Passos Rápidos (5 minutos)

### 1️⃣ Acesse o Netlify
- Vá em: https://app.netlify.com/
- Faça login com GitHub

### 2️⃣ Importe o Projeto
- Clique em **"Add new site"** → **"Import an existing project"**
- Escolha **"GitHub"**
- Selecione: **`italoandres/leche-lecha-identity`**

### 3️⃣ Configure (deixe assim)
```
Build command: npm run build
Publish directory: .next
```

### 4️⃣ Adicione as Variáveis de Ambiente
Clique em **"Show advanced"** → **"New variable"** e adicione:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=
MERCADOPAGO_ACCESS_TOKEN=
OPENAI_API_KEY=
NEXT_PUBLIC_BASE_URL=https://seu-site.netlify.app
```

⚠️ **Cole os mesmos valores do seu `.env.local`**

### 5️⃣ Deploy!
- Clique em **"Deploy site"**
- Aguarde 2-5 minutos
- Copie a URL gerada (ex: `https://random-123.netlify.app`)

### 6️⃣ Atualize a URL Base
- Vá em **"Site settings"** → **"Environment variables"**
- Edite `NEXT_PUBLIC_BASE_URL` com a URL real
- Clique em **"Trigger deploy"**

### 7️⃣ Configure o Webhook do Mercado Pago
- Acesse: https://www.mercadopago.com.br/developers
- Vá em sua aplicação → Webhooks
- Configure: `https://sua-url.netlify.app/api/webhook`

---

## ✅ Pronto!
Seu site está no ar! Teste tudo:
- Cadastro ✓
- Login ✓
- Teste ✓
- Pagamento ✓
- Leitura ✓

---

## 🔄 Próximos Deploys
Sempre que você fizer mudanças:
```bash
git add .
git commit -m "Sua mensagem"
git push
```

O Netlify vai fazer deploy automaticamente! 🎉

---

## 📞 Precisa de Ajuda?
Veja o guia completo em: `DEPLOY-NETLIFY.md`
