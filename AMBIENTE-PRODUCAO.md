# 🌐 Ambiente de Produção - Netlify

## 📍 Status Atual

**Ambiente Oficial:** Netlify  
**URL:** https://seu-site.netlify.app  
**Estrutura:** Next.js 14 completo  
**Deploy:** Automático via GitHub  

---

## ✅ Funcionalidades Ativas

### Frontend
- ✅ Diagnóstico interativo
- ✅ Sistema de autenticação (Supabase)
- ✅ Checkout integrado (Mercado Pago)
- ✅ Leitura personalizada
- ✅ Meta Pixel (eventos de conversão)

### Backend (API Routes)
- ✅ `/api/diagnostico` - IA para análise personalizada (OpenAI)
- ✅ `/api/create-preference` - Criação de checkout (Mercado Pago)
- ✅ `/api/webhook` - Processamento de pagamentos (Mercado Pago)

### Automações
- ✅ Liberação automática de acesso (Supabase)
- ✅ Envio automático de email (Resend)
- ✅ Rastreamento de conversões (Meta Pixel)

---

## 🔧 Configuração

### 1. Variáveis de Ambiente (Netlify)

Acesse: **Netlify Dashboard → Site Settings → Environment Variables**

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Mercado Pago - PRODUÇÃO
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-eb286344-8ad9-47c9-b166-abfba9e73a1f
MERCADOPAGO_ACCESS_TOKEN=APP_USR-4942431131580674-012320-ab8951b62674762c3f8257777b8b33fa-1662853894

# Base URL
NEXT_PUBLIC_BASE_URL=https://seu-site.netlify.app

# OpenAI
OPENAI_API_KEY=sk-proj-...

# Resend
RESEND_API_KEY=re_...
```

### 2. Webhook do Mercado Pago

**URL:** `https://seu-site.netlify.app/api/webhook`  
**Eventos:** `payment`

Configurar em: https://www.mercadopago.com.br/developers/panel/app

### 3. DNS do Resend

Adicionar registros DNS no seu provedor de domínio:

```
Tipo: TXT
Nome: resend._domainkey
Valor: [fornecido pelo Resend]

Tipo: MX
Nome: @
Valor: feedback-smtp.us-east-1.amazonses.com
Prioridade: 10
```

---

## 🚀 Deploy

### Automático (Recomendado)

```bash
git add .
git commit -m "Sua mensagem"
git push origin main
```

Netlify detecta o push e faz deploy automático em ~2 minutos.

### Manual (via Netlify CLI)

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## 🧪 Fluxo de Teste Completo

### 1. Diagnóstico
- Acessar site
- Responder questionário
- Verificar resultado personalizado

### 2. Cadastro
- Criar conta com email/senha
- Verificar evento `CompleteRegistration` no Meta Pixel

### 3. Checkout
- Clicar em "Acessar leitura completa"
- Redirecionar para Mercado Pago
- Pagar R$ 2,00

### 4. Webhook (Automático)
- Mercado Pago notifica Netlify
- Webhook processa pagamento
- Libera acesso no Supabase
- Envia email via Resend

### 5. Acesso Liberado
- Fazer login
- Acessar `/leitura`
- Verificar conteúdo completo disponível
- Verificar evento `Purchase` no Meta Pixel

---

## 📊 Monitoramento

### Netlify Functions Logs
- Acesse: Netlify Dashboard → Functions
- Verificar logs de:
  - `api/diagnostico`
  - `api/create-preference`
  - `api/webhook`

### Supabase Logs
- Acesse: Supabase Dashboard → Logs
- Verificar:
  - Autenticações
  - Queries no `user_progress`

### Meta Pixel
- Acesse: Meta Events Manager
- Verificar eventos:
  - `CompleteRegistration` (cadastro)
  - `Purchase` (pagamento)

---

## 🐛 Troubleshooting

### Webhook não está funcionando

1. Verificar URL no Mercado Pago
2. Verificar logs no Netlify Functions
3. Verificar variáveis de ambiente
4. Testar webhook manualmente:

```bash
curl -X POST https://seu-site.netlify.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "type": "payment",
    "data": {
      "id": "123456789"
    }
  }'
```

### Email não está sendo enviado

1. Verificar API Key do Resend
2. Verificar DNS configurado
3. Verificar logs no Resend Dashboard
4. Verificar spam/lixeira

### IA não está funcionando

1. Verificar API Key da OpenAI
2. Verificar créditos na conta OpenAI
3. Verificar logs no Netlify Functions
4. Verificar rate limits

---

## 💰 Custos Estimados

| Serviço | Plano | Custo Mensal |
|---------|-------|--------------|
| Netlify | Starter | R$ 0-20 |
| Supabase | Free | R$ 0 |
| Resend | Free | R$ 0 |
| OpenAI | Pay-as-you-go | R$ 5-20 |
| Mercado Pago | Comissão | 4.99% + R$ 0.49 |

**Total estimado:** R$ 5-40/mês (dependendo do volume)

---

## 📈 Limites do Plano Free

### Netlify
- ✅ 100 GB bandwidth/mês
- ✅ 300 minutos build/mês
- ✅ 125k function requests/mês

### Supabase
- ✅ 500 MB database
- ✅ 1 GB file storage
- ✅ 2 GB bandwidth

### Resend
- ✅ 100 emails/dia
- ✅ 3,000 emails/mês

---

## 🎯 Próximas Melhorias

- [ ] Configurar domínio customizado
- [ ] Adicionar SSL customizado
- [ ] Configurar analytics
- [ ] Adicionar testes automatizados
- [ ] Configurar staging environment

---

## 📞 Suporte

**Netlify:** https://docs.netlify.com  
**Supabase:** https://supabase.com/docs  
**Resend:** https://resend.com/docs  
**Mercado Pago:** https://www.mercadopago.com.br/developers
