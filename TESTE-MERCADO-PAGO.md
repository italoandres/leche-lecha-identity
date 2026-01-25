# 🧪 Guia Rápido de Teste - Mercado Pago

## ✅ O QUE FOI IMPLEMENTADO

Toda a integração com Mercado Pago está pronta:

- ✅ SDK instalado (`mercadopago`)
- ✅ Variáveis de ambiente configuradas (`.env.local`)
- ✅ API route para criar preferência (`/api/create-preference`)
- ✅ Checkout atualizado com formulário
- ✅ Páginas de retorno (sucesso, pendente, falha)
- ✅ Webhook para receber notificações

---

## 🔑 PASSO 1: Obter Credenciais de TESTE

1. Acesse: https://www.mercadopago.com.br/developers
2. Faça login
3. Vá em **"Suas integrações"** → **"Criar aplicação"**
4. Nome: "Identidade Negociada"
5. Tipo: **Pagamentos online**
6. Clique em **"Criar aplicação"**

### Copiar Credenciais de TESTE

Na página da aplicação, você verá:

```
Credenciais de teste
Public Key: TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Access Token: TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

---

## 📝 PASSO 2: Configurar .env.local

Abra o arquivo `.env.local` e substitua:

```env
# Mercado Pago - TESTE
NEXT_PUBLIC_MP_PUBLIC_KEY=TEST-seu-public-key-aqui
MP_ACCESS_TOKEN=TEST-seu-access-token-aqui
```

Por suas credenciais reais:

```env
# Mercado Pago - TESTE
NEXT_PUBLIC_MP_PUBLIC_KEY=TEST-1234567890-abcdef-1234567890-abcdef
MP_ACCESS_TOKEN=TEST-1234567890-abcdef-1234567890-abcdef
```

⚠️ **IMPORTANTE:** Use as credenciais de **TESTE** primeiro!

---

## 🚀 PASSO 3: Iniciar o Servidor

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 🧪 PASSO 4: Testar o Fluxo Completo

### 4.1 Navegar até o Checkout

1. Acesse: http://localhost:3000
2. Clique em **"Fazer o teste"**
3. Responda as perguntas
4. Na página de resultado, clique em **"Quero aprofundar meu entendimento"** ou **"Quero entender isso melhor"**
5. Na página de acesso, clique em **"Acessar material"**
6. Você chegará na página de checkout

### 4.2 Preencher Formulário

- **Nome:** Seu nome
- **Email:** seu@email.com
- Clique em **"Ir para pagamento"**

### 4.3 Você será redirecionado para o Mercado Pago

Agora você está na página de pagamento do Mercado Pago (ambiente de teste).

---

## 💳 PASSO 5: Usar Cartões de Teste

### ✅ Cartão que APROVA o pagamento:

```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/25
Nome: APRO
CPF: Qualquer CPF válido (ex: 123.456.789-00)
```

### ❌ Cartão que RECUSA o pagamento:

```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/25
Nome: OTHE
CPF: Qualquer CPF válido
```

### ⏳ Cartão que fica PENDENTE:

```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/25
Nome: CONT
CPF: Qualquer CPF válido
```

**Mais cartões de teste:**
https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards

---

## 📊 PASSO 6: Verificar Resultados

### Se usar cartão APRO (aprovado):
- Você será redirecionado para: `/pagamento/sucesso`
- Após 3 segundos, será redirecionado para: `/leitura`
- ✅ Acesso liberado!

### Se usar cartão OTHE (recusado):
- Você será redirecionado para: `/pagamento/falha`
- Pode tentar novamente

### Se usar cartão CONT (pendente):
- Você será redirecionado para: `/pagamento/pendente`
- Aguardando confirmação

---

## 🔍 PASSO 7: Verificar Logs

No terminal onde está rodando `npm run dev`, você verá:

```
Webhook recebido: { type: 'payment', data: { id: '123456' } }
Status do pagamento: approved
Email do comprador: seu@email.com
✅ Pagamento aprovado!
```

---

## 🎯 PASSO 8: Verificar no Painel do Mercado Pago

1. Acesse: https://www.mercadopago.com.br/activities
2. Vá em **"Atividades"** → **"Vendas"**
3. Você verá o pagamento de teste listado
4. Status: **Aprovado** (se usou cartão APRO)

---

## 🚀 PASSO 9: Colocar em Produção

### 9.1 Obter Credenciais de PRODUÇÃO

No painel do Mercado Pago:
1. Vá em **"Credenciais de produção"**
2. Copie:
   - Public Key: `APP_USR-xxxxxxxx`
   - Access Token: `APP_USR-xxxxxxxx`

### 9.2 Atualizar .env.local

```env
# Comentar credenciais de teste
# NEXT_PUBLIC_MP_PUBLIC_KEY=TEST-xxx
# MP_ACCESS_TOKEN=TEST-xxx

# Descomentar credenciais de produção
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-seu-public-key-real
MP_ACCESS_TOKEN=APP_USR-seu-access-token-real
```

### 9.3 Configurar Webhook em Produção

1. No painel do Mercado Pago
2. Vá em **"Webhooks"**
3. Configure a URL:
   ```
   https://seu-dominio.com/api/webhook
   ```

### 9.4 Deploy

```bash
# Fazer deploy na Vercel
vercel --prod

# Ou fazer build local
npm run build
npm start
```

---

## ✅ Checklist de Teste

- [ ] Credenciais de teste obtidas
- [ ] `.env.local` configurado
- [ ] Servidor rodando (`npm run dev`)
- [ ] Fluxo completo testado (teste → resultado → acesso → checkout)
- [ ] Pagamento aprovado com cartão APRO
- [ ] Redirecionamento para `/leitura` funcionando
- [ ] Webhook recebendo notificações (verificar logs)
- [ ] Pagamento visível no painel do Mercado Pago

---

## 🆘 Problemas Comuns

### Erro: "access_token is required"
- Verifique se o `.env.local` está configurado
- Reinicie o servidor: `Ctrl+C` e `npm run dev`

### Erro: "Invalid credentials"
- Verifique se copiou as credenciais corretas
- Use credenciais de **TESTE** primeiro

### Webhook não está recebendo notificações
- Em ambiente local, o webhook não funciona (precisa de URL pública)
- Use ngrok ou deploy em produção para testar webhook

### Pagamento não redireciona
- Verifique se `NEXT_PUBLIC_APP_URL` está correto no `.env.local`
- Em produção, use a URL real do site

---

## 📞 Suporte

**Documentação oficial:**
https://www.mercadopago.com.br/developers/pt/docs

**Cartões de teste:**
https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards

**Boa sorte! 🚀**
