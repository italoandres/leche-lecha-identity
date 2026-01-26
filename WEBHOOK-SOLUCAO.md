# ⚠️ IMPORTANTE: Webhook e Pagamentos

## 🚨 Situação Atual

Seu site está na **Hostinger (hospedagem compartilhada)**, que **NÃO suporta** API routes do Next.js.

Isso significa que o webhook `/api/webhook` **NÃO vai funcionar** para:
- Receber notificação do Mercado Pago sobre pagamento aprovado
- Liberar acesso automaticamente no Supabase
- Enviar email de boas-vindas automaticamente

---

## ✅ O que FUNCIONA

- ✅ Checkout (redirecionar para Mercado Pago)
- ✅ Página de sucesso (quando usuário volta)
- ✅ Meta Pixel Purchase event
- ✅ Login/Cadastro
- ✅ Leitura

---

## ❌ O que NÃO funciona

- ❌ Webhook do Mercado Pago
- ❌ Liberação automática de acesso
- ❌ Envio automático de email

---

## 🎯 SOLUÇÕES

### Opção 1: Estratégia Híbrida (RECOMENDADO) ⚡

**Frontend na Hostinger + Webhook no Netlify**

**Como funciona:**
1. Site principal roda na Hostinger (R$ 10-30/mês)
2. Webhook continua no Netlify (gratuito, só para API routes)
3. Mercado Pago notifica o Netlify
4. Netlify processa pagamento e libera acesso

**Vantagens:**
- ✅ Tudo funciona automaticamente
- ✅ Zero custo adicional (Netlify free tier)
- ✅ Você mantém controle do frontend na Hostinger
- ✅ Webhook funciona perfeitamente

**Como configurar:**

1. **Manter deploy no Netlify apenas para API routes:**
   - Não precisa mudar nada no Netlify
   - Ele continua rodando em paralelo

2. **Configurar webhook no Mercado Pago:**
   ```
   URL do Webhook: https://seu-site.netlify.app/api/webhook
   ```

3. **Atualizar variáveis de ambiente no Netlify:**
   - `NEXT_PUBLIC_BASE_URL=https://seudominio.com` (seu domínio da Hostinger)
   - Outras variáveis permanecem iguais

**Resultado:**
- Usuário acessa: `https://seudominio.com` (Hostinger)
- Mercado Pago notifica: `https://seu-site.netlify.app/api/webhook` (Netlify)
- Tudo funciona! 🎉

---

### Opção 2: Supabase Edge Functions

Migrar webhook para Supabase Edge Functions (gratuito, 500k requests/mês)

**Vantagens:**
- ✅ Gratuito
- ✅ Integrado com Supabase
- ✅ Fácil de gerenciar

**Desvantagens:**
- ❌ Precisa reescrever código
- ❌ Mais complexo de configurar

---

### Opção 3: Liberação Manual (Temporária)

**Como funciona:**
1. Cliente paga no Mercado Pago
2. Você recebe notificação por email do Mercado Pago
3. Você libera acesso manualmente no Supabase

**Como liberar acesso manualmente:**

1. Acesse Supabase Dashboard
2. Vá em "Table Editor" → `user_progress`
3. Encontre o usuário pelo email
4. Adicione `"identidade_negociada"` em `completed_chapter_ids`

**Vantagens:**
- ✅ Funciona imediatamente
- ✅ Sem configuração adicional

**Desvantagens:**
- ❌ Trabalho manual
- ❌ Cliente não recebe email automático
- ❌ Não escala

---

## 💡 Minha Recomendação

**Use Opção 1 (Estratégia Híbrida)**

É a solução mais simples e eficiente:
- Frontend na Hostinger (controle de custos)
- Webhook no Netlify (funcionalidade completa)
- Zero custo adicional
- Tudo funciona automaticamente

---

## 🔧 Configuração da Opção 1 (Passo a Passo)

### 1. Manter Netlify ativo

Não precisa fazer nada! O Netlify continua rodando.

### 2. Configurar webhook no Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers/panel/app
2. Selecione sua aplicação
3. Vá em "Webhooks"
4. Configure:
   ```
   URL de produção: https://seu-site.netlify.app/api/webhook
   Eventos: payment
   ```

### 3. Atualizar variáveis no Netlify

1. Acesse Netlify Dashboard
2. Site Settings → Environment Variables
3. Atualizar:
   ```
   NEXT_PUBLIC_BASE_URL=https://seudominio.com
   ```

### 4. Testar

1. Fazer um pagamento de teste (R$ 2,00)
2. Verificar se:
   - Acesso foi liberado no Supabase
   - Email foi enviado
   - Tudo funcionou automaticamente

---

## 📊 Comparação de Custos

| Solução | Custo Mensal | Complexidade |
|---------|--------------|--------------|
| Opção 1 (Híbrida) | R$ 10-30 | Baixa ⭐ |
| Opção 2 (Supabase) | R$ 10-30 | Média ⭐⭐ |
| Opção 3 (Manual) | R$ 10-30 | Baixa ⭐ |

---

## 🎯 Próximos Passos

**Para fazer teste de pagamento AGORA:**

1. **Escolher solução** (recomendo Opção 1)
2. **Configurar webhook** (se escolher Opção 1)
3. **Fazer pagamento de teste** (R$ 2,00)
4. **Verificar se funcionou**

---

## 📞 Precisa de Ajuda?

Me avisa qual opção você quer usar que te ajudo a configurar! 🙏
