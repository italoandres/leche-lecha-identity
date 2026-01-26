# ⚡ Guia Rápido - Configurar Resend (5 minutos)

## ✅ O que foi implementado

- ✅ Resend instalado
- ✅ Código implementado
- ✅ Email de boas-vindas automático
- ✅ Template HTML profissional
- ✅ Proteção contra falhas (não quebra se não configurado)

---

## 🚀 Configuração Rápida

### 1️⃣ Criar Conta no Resend (2 minutos)

1. Acesse: https://resend.com/
2. Clique em "Sign Up"
3. Crie sua conta (pode usar GitHub)
4. Confirme seu email

### 2️⃣ Obter API Key (1 minuto)

1. Após fazer login, vá em: https://resend.com/api-keys
2. Clique em "Create API Key"
3. Nome: `Lech Lecha Production`
4. Permissão: `Sending access`
5. Clique em "Add"
6. **COPIE A API KEY** (você só verá uma vez!)
   - Formato: `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`

### 3️⃣ Adicionar no Netlify (2 minutos)

1. Acesse: https://app.netlify.com/
2. Vá no seu site
3. Vá em "Site settings" → "Environment variables"
4. Clique em "Add a variable"
5. Adicione:

```
Key: RESEND_API_KEY
Value: re_xxxxxxxxxxxxxxxxxxxxxxxxxx (sua API key)
```

6. Clique em "Save"
7. Clique em "Trigger deploy" para fazer um novo deploy

---

## ✅ Pronto!

Agora, quando um cliente comprar:
1. ✅ Pagamento aprovado no Mercado Pago
2. ✅ Webhook cria usuário no Supabase
3. ✅ **Email automático enviado com credenciais**
4. ✅ Cliente recebe email e pode acessar

---

## 📧 O que o cliente vai receber

**Assunto:** 🎉 Bem-vindo ao Lech Lecha - Seu acesso está liberado!

**Conteúdo:**
- Credenciais de acesso (email + senha)
- Botão para acessar o site
- Instruções passo a passo
- Design profissional e clean

---

## 🧪 Como Testar

### Opção 1: Teste com Pagamento Real (Recomendado)

1. Faça um pagamento real de R$ 29,90
2. Aguarde aprovação
3. Verifique se recebeu o email
4. Teste o login com as credenciais

### Opção 2: Teste Manual (Desenvolvimento)

1. Adicione a API key no `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

2. Crie um arquivo de teste `test-email.ts`:
   ```typescript
   import { sendWelcomeEmail } from './lib/resend';
   
   sendWelcomeEmail('seu-email@gmail.com', 'SenhaTest123!')
     .then(() => console.log('Email enviado!'))
     .catch(console.error);
   ```

3. Execute: `npx ts-node test-email.ts`

---

## 📊 Monitorar Emails

1. Acesse: https://resend.com/emails
2. Você verá todos os emails enviados
3. Status: Sent, Delivered, Bounced, etc.
4. Clique em um email para ver detalhes

---

## 🔧 Configurações Opcionais

### Usar Domínio Próprio (Recomendado)

**Por quê?**
- Emails vêm de `contato@seudominio.com` (mais profissional)
- Melhor taxa de entrega
- Menos chance de cair no spam

**Como fazer:**
1. Vá em: https://resend.com/domains
2. Clique em "Add Domain"
3. Digite seu domínio
4. Siga as instruções para configurar DNS
5. Aguarde verificação (até 48h)

**Depois, atualize o código em `lib/resend.ts`:**
```typescript
from: 'Lech Lecha <contato@seudominio.com>',
```

---

## 💰 Limites

### Plano Gratuito:
- ✅ 100 emails por dia
- ✅ 3.000 emails por mês
- ✅ Todos os recursos

**Suficiente para começar!**

---

## 🐛 Problemas?

### Email não está sendo enviado

**Verifique:**
1. API Key está correta no Netlify?
2. Variável se chama `RESEND_API_KEY`?
3. Fez novo deploy após adicionar a variável?
4. Logs do Netlify mostram algum erro?

### Email cai no spam

**Soluções:**
1. Configure domínio próprio
2. Peça para o cliente adicionar seu email nos contatos
3. Evite palavras como "grátis", "promoção" no assunto

### Email não chega

**Verifique:**
1. Email do cliente está correto?
2. Verifique pasta de spam
3. Verifique logs no Resend: https://resend.com/emails
4. Teste com outro email

---

## ✅ Checklist

- [ ] Conta criada no Resend
- [ ] API Key obtida
- [ ] API Key adicionada no Netlify
- [ ] Deploy realizado
- [ ] Teste de pagamento feito
- [ ] Email recebido com sucesso

---

## 📞 Suporte

- Documentação: https://resend.com/docs
- Discord: https://resend.com/discord
- Email: support@resend.com

---

**Tempo total:** 5 minutos ⚡

**Resultado:** Emails automáticos funcionando! 🎉
