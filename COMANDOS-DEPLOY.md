# ⚡ Comandos Rápidos - Deploy Netlify

## 🚀 Deploy Completo (Copy & Paste)

### 1. Fazer Deploy

```bash
git add .
git commit -m "Reverter para estrutura completa - Netlify produção"
git push origin main
```

---

## 🔧 Configuração Local

### Instalar Dependências
```bash
npm install
```

### Rodar Localmente
```bash
npm run dev
```

### Build Local (testar)
```bash
npm run build
npm start
```

---

## 🧪 Testes

### Testar Diagnóstico (IA)
```bash
# Acessar: http://localhost:3000
# Responder questionário
# Verificar resultado personalizado
```

### Testar Checkout
```bash
# Acessar: http://localhost:3000/checkout
# Verificar redirecionamento para Mercado Pago
```

### Testar Webhook (Manual)
```bash
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "type": "payment",
    "data": {
      "id": "123456789"
    }
  }'
```

---

## 📊 Verificar Status

### Verificar Build
```bash
# Netlify Dashboard → Deploys
# Verificar status do último deploy
```

### Verificar Logs
```bash
# Netlify Dashboard → Functions → Logs
# Verificar logs em tempo real
```

### Verificar Variáveis
```bash
# Netlify Dashboard → Site Settings → Environment Variables
# Verificar se todas estão configuradas
```

---

## 🔗 URLs Importantes

### Netlify
- Dashboard: https://app.netlify.com
- Seu site: https://seu-site.netlify.app

### Mercado Pago
- Dashboard: https://www.mercadopago.com.br/developers/panel/app
- Webhooks: https://www.mercadopago.com.br/developers/panel/app → Webhooks

### Supabase
- Dashboard: https://supabase.com/dashboard
- Table Editor: https://supabase.com/dashboard/project/SEU_PROJETO/editor

### Resend
- Dashboard: https://resend.com/dashboard
- Domains: https://resend.com/domains

### Meta Pixel
- Events Manager: https://business.facebook.com/events_manager

---

## 🐛 Debug Rápido

### Webhook não funcionou
```bash
# 1. Verificar URL no Mercado Pago
# URL: https://seu-site.netlify.app/api/webhook

# 2. Verificar logs no Netlify
# Netlify → Functions → Logs

# 3. Testar manualmente
curl -X POST https://seu-site.netlify.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "type": "payment",
    "data": {
      "id": "SEU_PAYMENT_ID_REAL"
    }
  }'
```

### Email não chegou
```bash
# 1. Verificar spam/lixeira
# 2. Verificar API Key do Resend
# 3. Verificar DNS configurado
# 4. Verificar logs no Resend Dashboard
```

### IA não gerou texto
```bash
# 1. Verificar API Key da OpenAI
# 2. Verificar créditos na conta
# 3. Verificar logs no Netlify Functions
```

---

## 📋 Checklist Rápido

```bash
# Antes do deploy
[ ] Código atualizado
[ ] Testes locais passando
[ ] Variáveis de ambiente configuradas

# Deploy
[ ] git push origin main
[ ] Aguardar build no Netlify (~2 min)
[ ] Verificar deploy bem-sucedido

# Configuração
[ ] Variáveis de ambiente no Netlify
[ ] Webhook no Mercado Pago
[ ] DNS do Resend (se necessário)

# Teste
[ ] Fazer pagamento de R$ 2,00
[ ] Verificar webhook processou
[ ] Verificar acesso liberado
[ ] Verificar email enviado
[ ] Verificar Meta Pixel disparou
```

---

## 🎯 Comandos Git Úteis

### Ver status
```bash
git status
```

### Ver diferenças
```bash
git diff
```

### Ver histórico
```bash
git log --oneline
```

### Desfazer último commit (local)
```bash
git reset --soft HEAD~1
```

### Forçar push (cuidado!)
```bash
git push origin main --force
```

---

## 🔄 Rollback (se necessário)

### Voltar para versão anterior
```bash
# No Netlify Dashboard
# Deploys → Selecionar deploy anterior → Publish deploy
```

### Ou via Git
```bash
git revert HEAD
git push origin main
```

---

## 📊 Monitoramento

### Ver logs em tempo real (Netlify CLI)
```bash
npm install -g netlify-cli
netlify login
netlify functions:log
```

### Ver logs do Supabase
```bash
# Supabase Dashboard → Logs
# Filtrar por: Auth, Database, API
```

---

## 💡 Dicas

### Deploy mais rápido
```bash
# Usar Netlify CLI
netlify deploy --prod
```

### Testar antes de produção
```bash
# Deploy de preview
netlify deploy
```

### Ver site local na rede
```bash
npm run dev -- -H 0.0.0.0
# Acessar de outro dispositivo: http://SEU_IP:3000
```

---

## 🎉 Tudo Pronto!

Após executar os comandos acima, seu site estará:

✅ Deployado no Netlify  
✅ Com todas as funcionalidades ativas  
✅ Webhook processando pagamentos  
✅ IA gerando diagnósticos  
✅ Emails sendo enviados  
✅ Meta Pixel rastreando conversões  

**Tempo total:** 15-30 minutos

---

**Boa sorte! 🚀**
