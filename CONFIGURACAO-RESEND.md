# 📧 Configuração do Resend - Guia Completo

## 🎯 O que vamos fazer

Configurar o Resend para enviar emails automáticos quando um cliente comprar o acesso.

---

## 📋 Passo 1: Criar Conta no Resend

1. Acesse: https://resend.com/
2. Clique em "Sign Up"
3. Crie sua conta (pode usar GitHub)
4. Confirme seu email

---

## 🔑 Passo 2: Obter API Key

1. Após fazer login, vá em: https://resend.com/api-keys
2. Clique em "Create API Key"
3. Nome: `Lech Lecha Production`
4. Permissão: `Sending access`
5. Clique em "Add"
6. **COPIE A API KEY** (você só verá uma vez!)
   - Formato: `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 📧 Passo 3: Configurar Domínio (Opcional mas Recomendado)

### Por que configurar domínio?

- ✅ Emails vêm de `contato@seudominio.com` (mais profissional)
- ✅ Melhor taxa de entrega
- ✅ Menos chance de cair no spam

### Como configurar:

1. Vá em: https://resend.com/domains
2. Clique em "Add Domain"
3. Digite seu domínio: `seudominio.com`
4. Siga as instruções para adicionar registros DNS
5. Aguarde verificação (pode levar até 48h)

### Se não tiver domínio próprio:

Você pode usar o domínio padrão do Resend:
- Emails virão de: `onboarding@resend.dev`
- Funciona perfeitamente para testes e início

---

## 🔧 Passo 4: Adicionar API Key no Netlify

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
7. Faça um novo deploy (ou clique em "Trigger deploy")

---

## 📝 Passo 5: Adicionar no .env.local (Desenvolvimento)

Para testar localmente, adicione no arquivo `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

**IMPORTANTE:** Nunca commite a API key no Git!

---

## ✅ Verificação

Após configurar, você deve ter:

- [x] Conta criada no Resend
- [x] API Key copiada
- [x] API Key adicionada no Netlify
- [x] API Key adicionada no .env.local
- [ ] Domínio configurado (opcional)

---

## 📧 Configuração de Email

### Email Remetente (From)

**Se configurou domínio:**
```
contato@seudominio.com
```

**Se não configurou domínio:**
```
onboarding@resend.dev
```

### Email de Resposta (Reply-To)

Configure um email real para receber respostas:
```
suporte@seudominio.com
```
ou
```
seu-email@gmail.com
```

---

## 🧪 Teste de Envio

Após configurar, você pode testar enviando um email de teste:

1. Acesse: https://resend.com/emails
2. Clique em "Send Test Email"
3. Preencha:
   - From: `onboarding@resend.dev` (ou seu domínio)
   - To: seu email pessoal
   - Subject: Teste
   - Body: Teste de envio
4. Clique em "Send"
5. Verifique se recebeu o email

---

## 📊 Monitoramento

### Ver emails enviados:

1. Acesse: https://resend.com/emails
2. Você verá todos os emails enviados
3. Status: Sent, Delivered, Bounced, etc.

### Logs:

- Cada email tem um log detalhado
- Você pode ver se foi entregue, aberto, clicado, etc.

---

## 💰 Limites e Preços

### Plano Gratuito:
- ✅ 100 emails por dia
- ✅ 3.000 emails por mês
- ✅ Todos os recursos

### Plano Pago (se precisar):
- $20/mês: 50.000 emails
- $80/mês: 100.000 emails

**Para começar, o plano gratuito é mais que suficiente!**

---

## 🔒 Segurança

### Boas práticas:

1. ✅ Nunca commite a API key no Git
2. ✅ Use variáveis de ambiente
3. ✅ Não compartilhe a API key
4. ✅ Se vazar, revogue e crie nova

### Revogar API Key:

1. Vá em: https://resend.com/api-keys
2. Clique nos 3 pontinhos da key
3. Clique em "Delete"
4. Crie uma nova

---

## 📝 Próximos Passos

Após configurar o Resend:

1. ✅ API Key configurada
2. ✅ Código implementado (já fiz)
3. ✅ Teste de envio
4. ✅ Deploy no Netlify
5. ✅ Teste com pagamento real

---

## 🐛 Troubleshooting

### Email não está sendo enviado

**Verifique:**
1. API Key está correta no Netlify?
2. Variável se chama `RESEND_API_KEY`?
3. Fez novo deploy após adicionar a variável?
4. Logs do Netlify mostram algum erro?

### Email cai no spam

**Soluções:**
1. Configure domínio próprio
2. Configure SPF, DKIM, DMARC
3. Use email de resposta real
4. Evite palavras como "grátis", "promoção" no assunto

### Email não chega

**Verifique:**
1. Email do cliente está correto?
2. Verifique pasta de spam
3. Verifique logs no Resend
4. Teste com outro email

---

## ✅ Checklist Final

Antes de fazer deploy:

- [ ] Conta criada no Resend
- [ ] API Key obtida
- [ ] API Key adicionada no Netlify
- [ ] API Key adicionada no .env.local
- [ ] Teste de envio realizado
- [ ] Email recebido com sucesso
- [ ] Código implementado
- [ ] Build local passou
- [ ] Deploy realizado

---

## 📞 Suporte

Se tiver problemas:

1. Documentação: https://resend.com/docs
2. Discord: https://resend.com/discord
3. Email: support@resend.com

---

**Pronto! Agora vamos implementar o código.** 🚀
