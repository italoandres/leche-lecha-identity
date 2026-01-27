# 🚀 Integração Hotmart - Guia Rápido

## ✅ O que foi feito

### 1. Código Atualizado
- ✅ Página `/checkout` atualizada com link Hotmart
- ✅ Checkout pré-populado (nome + email automáticos)
- ✅ Webhook endpoint criado: `/api/webhook-hotmart`
- ✅ Preço atualizado: $7.50 USD

### 2. Link do Produto
```
https://pay.hotmart.com/U104102596N
```

---

## 🔧 Próximos Passos (VOCÊ PRECISA FAZER)

### Passo 1: Configurar Webhook na Hotmart

1. **Acessar Hotmart:**
   - Login: https://app.hotmart.com
   - Menu: **Ferramentas** → **Webhook (API e notificações)**

2. **Adicionar Webhook:**
   - Clicar: **"Adicionar webhook"**
   - URL: `https://lechlecha.shop/api/webhook-hotmart`
   - Eventos: Selecionar **"PURCHASE_COMPLETE"**
   - Versão: **V2**
   - Salvar

3. **Testar Webhook (Opcional):**
   - Hotmart tem ferramenta de teste
   - Enviar evento de teste
   - Verificar se recebeu no Netlify Functions

---

### Passo 2: Configurar URLs de Retorno

1. **Acessar produto na Hotmart**
2. **Ir em: Configurações → URLs de retorno**
3. **Configurar:**
   - **URL de sucesso:** `https://lechlecha.shop/bem-vindo`
   - **URL de cancelamento:** `https://lechlecha.shop/checkout`

---

### Passo 3: Personalizar Checkout (Opcional)

1. **Acessar Hotmart**
2. **Ir em: Ferramentas → Aparência da página de pagamento**
3. **Personalizar:**
   - Logo: Upload da logo Lech Lecha
   - Cores: Usar paleta do site (#000000, #FFFFFF)
   - Descrição: Adicionar texto sobre o produto

---

### Passo 4: Fazer Deploy

```bash
git add .
git commit -m "Integração Hotmart completa"
git push origin main
```

O Netlify vai fazer deploy automático.

---

## 🧪 Como Testar

### Teste Completo do Fluxo

1. **Fazer cadastro:**
   - Acessar: https://lechlecha.shop/cadastro
   - Criar conta com email real

2. **Ir para checkout:**
   - Acessar: https://lechlecha.shop/checkout
   - Verificar se nome e email aparecem corretos
   - Clicar em "Continuar para Pagamento"

3. **Fazer pagamento na Hotmart:**
   - Usar cartão de teste: `4111 1111 1111 1111`
   - CVV: `123`
   - Validade: Qualquer data futura
   - Completar pagamento

4. **Verificar automações:**
   - Webhook deve processar (verificar logs Netlify)
   - Acesso deve ser liberado (verificar Supabase)
   - Email deve ser enviado (verificar inbox)
   - Redirecionamento para `/bem-vindo`

---

## 📊 Monitoramento

### Verificar Logs do Webhook

**Netlify Functions:**
1. Acessar: https://app.netlify.com
2. Ir em: **Functions**
3. Procurar: `webhook-hotmart`
4. Ver logs de execução

### Verificar Liberação de Acesso

**Supabase:**
1. Acessar: https://supabase.com
2. Ir em: **Table Editor** → `user_progress`
3. Verificar campo `completed_chapter_ids`
4. Deve conter: `["identidade_negociada"]`

### Verificar Email

- Inbox do email usado no cadastro
- Assunto: "Seu acesso está liberado"

---

## 🎯 Fluxo Completo

```
1. Usuário faz cadastro
   ↓
2. Usuário vai para /checkout
   ↓
3. Clica em "Continuar para Pagamento"
   ↓
4. Redireciona para Hotmart (dados pré-populados)
   ↓
5. Usuário paga na Hotmart
   ↓
6. Hotmart envia webhook para /api/webhook-hotmart
   ↓
7. Webhook libera acesso no Supabase
   ↓
8. Webhook envia email via Resend
   ↓
9. Hotmart redireciona para /bem-vindo
   ↓
10. Usuário acessa leitura completa
```

---

## ✅ Checklist

- [ ] Deploy feito no Netlify
- [ ] Webhook configurado na Hotmart
- [ ] URLs de retorno configuradas
- [ ] Teste de pagamento realizado
- [ ] Webhook processou corretamente
- [ ] Acesso liberado no Supabase
- [ ] Email enviado
- [ ] Checkout personalizado (opcional)

---

## 🔄 Remover Mercado Pago (Depois de Testar)

Após confirmar que Hotmart funciona:

```bash
# Remover arquivos antigos
rm app/api/create-preference/route.ts
rm app/api/webhook/route.ts

# Commit
git add .
git commit -m "Remover Mercado Pago"
git push origin main
```

Também remover variáveis do Netlify:
- `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`
- `MERCADOPAGO_ACCESS_TOKEN`

---

## 🎉 Pronto!

Agora você tem:
- ✅ Checkout otimizado da Hotmart
- ✅ Vendas globais em USD
- ✅ Checkout pré-populado
- ✅ Webhook confiável
- ✅ Email automático
- ✅ Estrutura própria

**Tempo estimado:** 15-30 minutos

**Dúvidas?** Verifica os logs no Netlify Functions! 🚀
