# ⚡ Teste Rápido da Conversão Purchase (2 minutos)

## 🎯 Objetivo
Verificar se o evento `Purchase` está funcionando SEM precisar fazer um pagamento real.

---

## 📋 Passo a Passo

### 1️⃣ Acesse a URL com Parâmetros

Copie e cole no navegador (substitua `seu-site.netlify.app` pela URL real):

```
https://seu-site.netlify.app/pagamento/sucesso?payment_id=123456789&status=approved
```

**Exemplo real:**
```
https://leche-lecha-identity.netlify.app/pagamento/sucesso?payment_id=123456789&status=approved
```

### 2️⃣ Abra o Console

1. Pressione `F12`
2. Vá na aba "Console"
3. Procure por: `Meta Pixel: Purchase event tracked - R$ 29,90`

**✅ Se aparecer:** Conversão está funcionando!

### 3️⃣ Verifique com Pixel Helper (Opcional)

1. Instale: [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Acesse a URL do passo 1
3. Clique no ícone da extensão
4. Deve mostrar: `Purchase` com valor 29.90 BRL

**✅ Se aparecer:** Conversão está funcionando!

### 4️⃣ Verifique no Facebook Events Manager

1. Acesse: https://business.facebook.com/events_manager
2. Selecione seu Pixel (ID: 1509155450182260)
3. Vá em "Test Events"
4. Acesse a URL do passo 1
5. O evento deve aparecer em tempo real

**✅ Se aparecer:** Conversão está funcionando!

---

## ✅ Teste de Segurança (Não Deve Disparar)

Acesse a URL SEM parâmetros:

```
https://seu-site.netlify.app/pagamento/sucesso
```

**❌ O evento NÃO deve disparar**
**❌ O console NÃO deve mostrar a mensagem**

Se disparar, há um problema que precisa ser corrigido.

---

## 🐛 Problemas?

### Evento não dispara com parâmetros

**Verifique:**
- [ ] URL tem `?payment_id=123&status=approved`
- [ ] Meta Pixel está carregado (use Pixel Helper)
- [ ] Console não mostra erros
- [ ] Está em HTTPS (não HTTP)

### Evento dispara sem parâmetros

**Isso é um bug!** Me avise imediatamente.

---

## 🎉 Sucesso!

Se o evento disparou corretamente:
1. ✅ Conversão está funcionando
2. ✅ Pode configurar no Ads Manager
3. ✅ Pode criar campanhas otimizadas para Purchase
4. ✅ Pode medir ROAS

---

## 📊 Próximos Passos

1. Configure como conversão no Ads Manager
2. Crie campanhas otimizadas para ROAS
3. Adicione `InitiateCheckout` no checkout
4. Configure credenciais de TESTE para testar fluxo completo

---

**Tempo total:** 2 minutos ⚡
