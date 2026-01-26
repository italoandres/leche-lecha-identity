# ✅ Checklist: Deploy Completo no Netlify

## 🎯 Objetivo

Garantir que o projeto está 100% funcional no Netlify com todas as automações ativas.

---

## 📋 Pré-Deploy

### 1. Código Atualizado
- [x] `next.config.js` revertido (sem `output: 'export'`)
- [x] API routes ativas
- [x] Webhook ativo
- [x] IA ativa

### 2. Variáveis de Ambiente Locais
- [ ] `.env.local` configurado com credenciais de produção
- [ ] Testar localmente: `npm run dev`
- [ ] Testar diagnóstico (IA)
- [ ] Testar checkout (Mercado Pago)

---

## 🚀 Deploy

### 1. Commit e Push
```bash
git add .
git commit -m "Reverter para estrutura completa - Netlify produção"
git push origin main
```

### 2. Aguardar Deploy
- [ ] Acessar Netlify Dashboard
- [ ] Verificar build em andamento
- [ ] Aguardar conclusão (~2 minutos)
- [ ] Verificar se deploy foi bem-sucedido

---

## 🔧 Configuração Netlify

### 1. Variáveis de Ambiente

Acesse: **Site Settings → Environment Variables**

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Mercado Pago - PRODUÇÃO
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-eb286344-8ad9-47c9-b166-abfba9e73a1f
MERCADOPAGO_ACCESS_TOKEN=APP_USR-4942431131580674-012320-ab8951b62674762c3f8257777b8b33fa-1662853894

# Base URL (seu domínio Netlify)
NEXT_PUBLIC_BASE_URL=https://seu-site.netlify.app

# OpenAI
OPENAI_API_KEY=sk-proj-...

# Resend
RESEND_API_KEY=re_...
```

**Checklist:**
- [ ] Todas as variáveis adicionadas
- [ ] Valores corretos (sem espaços extras)
- [ ] Fazer redeploy após adicionar variáveis

### 2. Verificar Build Settings

Acesse: **Site Settings → Build & Deploy**

```
Build command: npm run build
Publish directory: .next
```

- [ ] Configurações corretas
- [ ] Plugin Next.js instalado

---

## 🔗 Integrações Externas

### 1. Webhook do Mercado Pago

Acesse: https://www.mercadopago.com.br/developers/panel/app

**Configuração:**
- [ ] URL: `https://seu-site.netlify.app/api/webhook`
- [ ] Eventos: `payment`
- [ ] Modo: Produção
- [ ] Salvar

### 2. DNS do Resend

Acesse: https://resend.com/domains

**Registros DNS:**
- [ ] TXT: `resend._domainkey`
- [ ] MX: `feedback-smtp.us-east-1.amazonses.com`
- [ ] Aguardar propagação (até 48h)
- [ ] Verificar status no Resend

### 3. Meta Pixel

Acesse: https://business.facebook.com/events_manager

**Verificação:**
- [ ] Pixel instalado no site
- [ ] Domain verification configurada
- [ ] Eventos aparecendo no Test Events

---

## 🧪 Testes Completos

### 1. Teste de Diagnóstico (IA)

- [ ] Acessar site no Netlify
- [ ] Responder questionário completo
- [ ] Verificar resultado personalizado
- [ ] Verificar que texto é único (não genérico)

**Se falhar:**
- Verificar API Key da OpenAI
- Verificar logs: Netlify → Functions → `api/diagnostico`

### 2. Teste de Cadastro

- [ ] Criar conta com email/senha
- [ ] Verificar login funcionando
- [ ] Verificar evento `CompleteRegistration` no Meta Pixel

**Se falhar:**
- Verificar credenciais Supabase
- Verificar Meta Pixel instalado

### 3. Teste de Checkout

- [ ] Clicar em "Acessar leitura completa"
- [ ] Redirecionar para Mercado Pago
- [ ] Verificar valor: R$ 2,00
- [ ] Verificar descrição: "Leitura Personalizada - Narcisismo Materno"

**Se falhar:**
- Verificar credenciais Mercado Pago
- Verificar logs: Netlify → Functions → `api/create-preference`

### 4. Teste de Pagamento (CRÍTICO)

- [ ] Fazer pagamento de R$ 2,00
- [ ] Aguardar aprovação (~30 segundos)
- [ ] Verificar redirecionamento para `/pagamento/sucesso`

**Verificar automações:**

#### 4.1. Webhook Recebido
- [ ] Netlify → Functions → Logs
- [ ] Procurar por: "Webhook recebido"
- [ ] Verificar status: 200

#### 4.2. Acesso Liberado
- [ ] Supabase → Table Editor → `user_progress`
- [ ] Encontrar seu usuário
- [ ] Verificar: `completed_chapter_ids` = `["identidade_negociada"]`

#### 4.3. Email Enviado
- [ ] Verificar inbox (e spam)
- [ ] Assunto: "Seu acesso está liberado"
- [ ] Verificar link funciona

#### 4.4. Meta Pixel Purchase
- [ ] Meta Events Manager → Test Events
- [ ] Verificar evento `Purchase`
- [ ] Valor: R$ 2,00

### 5. Teste de Acesso

- [ ] Fazer login no site
- [ ] Acessar `/leitura`
- [ ] Verificar conteúdo completo disponível
- [ ] Verificar navegação entre capítulos

---

## 🐛 Troubleshooting

### Webhook não funcionou

**Sintomas:**
- Pagamento aprovado
- Mas acesso não foi liberado
- Email não foi enviado

**Soluções:**
1. Verificar URL do webhook no Mercado Pago
2. Verificar logs no Netlify Functions
3. Verificar variáveis de ambiente (SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY)
4. Testar webhook manualmente:

```bash
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

**Soluções:**
1. Verificar spam/lixeira
2. Verificar DNS do Resend configurado
3. Verificar logs no Resend Dashboard
4. Verificar API Key do Resend

### IA não está gerando texto

**Soluções:**
1. Verificar API Key da OpenAI
2. Verificar créditos na conta OpenAI
3. Verificar logs no Netlify Functions
4. Verificar rate limits da OpenAI

---

## ✅ Checklist Final

Antes de considerar o deploy completo:

- [ ] Site acessível no Netlify
- [ ] Diagnóstico funcionando (IA)
- [ ] Cadastro funcionando
- [ ] Checkout funcionando
- [ ] Pagamento de teste realizado (R$ 2,00)
- [ ] Webhook processou pagamento
- [ ] Acesso liberado automaticamente
- [ ] Email enviado automaticamente
- [ ] Meta Pixel rastreando eventos
- [ ] Login e leitura funcionando

---

## 🎉 Deploy Completo!

Se todos os itens acima estão marcados, seu projeto está 100% funcional no Netlify!

**Próximos passos:**
1. Monitorar primeiros pagamentos reais
2. Ajustar valor do produto (se necessário)
3. Configurar domínio customizado (opcional)
4. Adicionar analytics (opcional)

---

## 📊 Monitoramento Contínuo

### Diário
- [ ] Verificar logs do Netlify Functions
- [ ] Verificar eventos no Meta Pixel
- [ ] Verificar emails enviados no Resend

### Semanal
- [ ] Verificar custos da OpenAI
- [ ] Verificar taxa de conversão
- [ ] Verificar feedback dos usuários

### Mensal
- [ ] Revisar limites dos planos free
- [ ] Considerar upgrade se necessário
- [ ] Analisar métricas de conversão
