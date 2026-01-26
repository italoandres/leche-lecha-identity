# 🎯 Próximos Passos - Deploy no Netlify

## ✅ O que já está pronto

- ✅ Código revertido para estrutura completa do Next.js
- ✅ API routes ativas (webhook, IA, checkout)
- ✅ Credenciais de PRODUÇÃO do Mercado Pago configuradas
- ✅ Valor do produto: R$ 2,00 (para teste)
- ✅ Documentação completa criada

---

## 🚀 Passo 1: Fazer Deploy

```bash
git add .
git commit -m "Reverter para estrutura completa - Netlify produção"
git push origin main
```

**Aguardar:** ~2 minutos para o Netlify fazer deploy automático

---

## 🔧 Passo 2: Configurar Variáveis de Ambiente

Acesse: **Netlify Dashboard → Site Settings → Environment Variables**

### Adicionar estas variáveis:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Mercado Pago - PRODUÇÃO (já configurado no código)
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-eb286344-8ad9-47c9-b166-abfba9e73a1f
MERCADOPAGO_ACCESS_TOKEN=APP_USR-4942431131580674-012320-ab8951b62674762c3f8257777b8b33fa-1662853894

# Base URL (seu domínio Netlify)
NEXT_PUBLIC_BASE_URL=https://seu-site.netlify.app

# OpenAI
OPENAI_API_KEY=sk-proj-...

# Resend
RESEND_API_KEY=re_...
```

**Importante:** Após adicionar as variáveis, fazer **Redeploy** no Netlify.

---

## 🔗 Passo 3: Configurar Webhook no Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers/panel/app
2. Selecione sua aplicação
3. Vá em **"Webhooks"**
4. Configure:
   - **URL de produção:** `https://seu-site.netlify.app/api/webhook`
   - **Eventos:** `payment`
5. Salvar

---

## 🧪 Passo 4: Fazer Teste de Pagamento

### 4.1. Acessar o Site
- URL: `https://seu-site.netlify.app`

### 4.2. Completar Fluxo
1. Responder questionário (diagnóstico)
2. Criar conta (cadastro)
3. Fazer checkout
4. Pagar R$ 2,00 no Mercado Pago

### 4.3. Verificar Automações

**Webhook processou?**
- Netlify → Functions → Logs
- Procurar por: "Webhook recebido"

**Acesso liberado?**
- Supabase → Table Editor → `user_progress`
- Verificar: `completed_chapter_ids` = `["identidade_negociada"]`

**Email enviado?**
- Verificar inbox (e spam)
- Assunto: "Seu acesso está liberado"

**Meta Pixel disparou?**
- Meta Events Manager → Test Events
- Verificar evento `Purchase` (R$ 2,00)

### 4.4. Testar Acesso
- Fazer login no site
- Acessar `/leitura`
- Verificar conteúdo completo disponível

---

## 📋 Checklist Rápido

- [ ] Push para GitHub
- [ ] Deploy no Netlify concluído
- [ ] Variáveis de ambiente configuradas
- [ ] Redeploy após adicionar variáveis
- [ ] Webhook configurado no Mercado Pago
- [ ] Teste de pagamento realizado (R$ 2,00)
- [ ] Webhook processou pagamento
- [ ] Acesso liberado automaticamente
- [ ] Email enviado automaticamente
- [ ] Meta Pixel rastreou Purchase
- [ ] Login e leitura funcionando

---

## 🐛 Se algo não funcionar

### Webhook não processou
1. Verificar URL no Mercado Pago
2. Verificar logs no Netlify Functions
3. Verificar variáveis de ambiente (SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY)

### Email não chegou
1. Verificar spam/lixeira
2. Verificar API Key do Resend
3. Verificar DNS do Resend configurado

### IA não gerou texto
1. Verificar API Key da OpenAI
2. Verificar créditos na conta OpenAI
3. Verificar logs no Netlify Functions

---

## 📚 Documentação de Referência

- **AMBIENTE-PRODUCAO.md** - Configuração completa do ambiente
- **CHECKLIST-DEPLOY-NETLIFY.md** - Checklist detalhado passo a passo
- **REVERSAO-NETLIFY.md** - Detalhes técnicos da reversão
- **RESUMO-REVERSAO.md** - Resumo executivo

---

## 🎉 Quando tudo estiver funcionando

Você terá:

✅ Site completo no Netlify  
✅ Fluxo 100% automatizado  
✅ Webhook processando pagamentos  
✅ IA gerando diagnósticos  
✅ Emails sendo enviados  
✅ Meta Pixel rastreando conversões  

**Custo estimado:** R$ 5-20/mês (dependendo do volume)

---

## 💡 Dica Final

Mantenha o Netlify Dashboard aberto durante o teste para monitorar:
- Build logs
- Function logs
- Deploy status

Isso facilita identificar problemas rapidamente.

---

**Boa sorte com o deploy! 🚀**

Se precisar de ajuda, consulte a documentação ou me avise.
