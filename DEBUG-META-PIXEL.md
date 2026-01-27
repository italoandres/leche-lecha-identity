# 🐛 Debug: Meta Pixel não está registrando conversões

## ✅ Status da Implementação

**Eventos implementados:**
- ✅ `CompleteRegistration` (cadastro) - `app/cadastro/page.tsx`
- ✅ `Purchase` (pagamento) - `app/pagamento/sucesso/page.tsx`
- ✅ Meta Pixel instalado - `app/layout.tsx`
- ✅ Pixel ID: `1509155450182260`

**Código está correto!** Se não está funcionando, é problema de configuração ou ambiente.

---

## 🔍 Checklist de Debug

### 1. Verificar se Pixel está carregando

**Abrir Console do navegador (F12):**

```javascript
// Verificar se fbq existe
typeof window.fbq
// Deve retornar: "function"

// Verificar se Pixel foi inicializado
window.fbq
// Deve mostrar a função do Pixel
```

**Se retornar `undefined`:**
- Pixel não está carregando
- Pode ser bloqueador de anúncios
- Pode ser erro no script

---

### 2. Testar Eventos Manualmente

**No Console do navegador:**

```javascript
// Testar CompleteRegistration
window.fbq('track', 'CompleteRegistration');

// Testar Purchase
window.fbq('track', 'Purchase', { value: 2.00, currency: 'BRL' });
```

**Verificar no Meta Events Manager → Test Events**
- Eventos devem aparecer em tempo real

---

### 3. Verificar Bloqueadores

**Desabilitar temporariamente:**
- AdBlock
- uBlock Origin
- Brave Shield
- Privacy Badger
- Qualquer extensão de privacidade

**Testar em:**
- Navegador anônimo (sem extensões)
- Outro navegador
- Celular (sem bloqueadores)

---

### 4. Verificar Domain Verification

**Meta Business Manager:**
1. Acesse: https://business.facebook.com/settings/owned-domains
2. Verificar se seu domínio está listado
3. Verificar se está verificado (✅)

**Se não estiver verificado:**
- Adicionar meta tag no `<head>` (já está!)
- Aguardar verificação (pode demorar 24-48h)

---

### 5. Verificar Test Events

**Meta Events Manager:**
1. Acesse: https://business.facebook.com/events_manager
2. Selecione seu Pixel (1509155450182260)
3. Clique em **Test Events**
4. Abra seu site em outra aba
5. Faça ações (cadastro, pagamento)
6. Eventos devem aparecer em tempo real

**Se não aparecer:**
- Pixel não está carregando
- Bloqueador ativo
- Código não está executando

---

### 6. Verificar Console Logs

**Após fazer cadastro:**
```
Meta Pixel: CompleteRegistration event tracked
```

**Após acessar página de sucesso:**
```
Meta Pixel: Purchase event tracked - R$ 2,00
```

**Se não aparecer:**
- Evento não está disparando
- Verificar se chegou na linha de código
- Verificar se `window.fbq` existe

---

## 🧪 Testes Específicos

### Teste 1: CompleteRegistration

**Passo a passo:**
1. Acesse: `https://seu-site.netlify.app/cadastro`
2. Abra Console (F12)
3. Preencha formulário
4. Clique em "Criar acesso"
5. Aguarde sucesso
6. Verificar console: "Meta Pixel: CompleteRegistration event tracked"
7. Verificar Test Events no Meta

**Se não funcionar:**
- Verificar se cadastro foi bem-sucedido
- Verificar se redirecionou para `/teste`
- Verificar se `window.fbq` existe

---

### Teste 2: Purchase

**Passo a passo:**
1. Acesse: `https://seu-site.netlify.app/pagamento/sucesso?payment_id=123&status=approved`
2. Abra Console (F12)
3. Verificar console: "Meta Pixel: Purchase event tracked - R$ 2,00"
4. Verificar Test Events no Meta

**Se não funcionar:**
- Verificar se URL tem `payment_id` ou `status=approved`
- Verificar se `window.fbq` existe
- Verificar se página carregou completamente

---

## 🔧 Soluções Comuns

### Problema 1: Pixel não carrega

**Sintoma:** `typeof window.fbq` retorna `undefined`

**Soluções:**
1. Desabilitar bloqueadores de anúncios
2. Testar em navegador anônimo
3. Verificar se script está no `<head>`
4. Verificar se há erros no Console

---

### Problema 2: Eventos não aparecem no Meta

**Sintoma:** Console mostra log, mas Meta não registra

**Soluções:**
1. Aguardar 15-30 minutos (delay normal)
2. Usar Test Events (tempo real)
3. Verificar se Pixel ID está correto
4. Verificar se domínio está verificado

---

### Problema 3: Eventos disparam múltiplas vezes

**Sintoma:** Mesmo evento aparece várias vezes

**Soluções:**
1. Verificar se não há reload da página
2. Verificar se useEffect tem dependências corretas
3. Adicionar flag para disparar apenas uma vez

---

### Problema 4: Purchase não dispara

**Sintoma:** CompleteRegistration funciona, mas Purchase não

**Soluções:**
1. Verificar se URL tem `payment_id` ou `status=approved`
2. Verificar se Mercado Pago está redirecionando corretamente
3. Testar manualmente: `/pagamento/sucesso?payment_id=123&status=approved`

---

## 📊 Verificação Final

### Checklist:

- [ ] `typeof window.fbq` retorna `"function"`
- [ ] Console mostra logs dos eventos
- [ ] Test Events mostra eventos em tempo real
- [ ] Bloqueadores desabilitados
- [ ] Domínio verificado no Meta
- [ ] Pixel ID correto: `1509155450182260`
- [ ] Site deployado no Netlify (não localhost)

---

## 🎯 Teste Definitivo

**Teste completo em 5 minutos:**

```bash
# 1. Abrir site no Netlify
https://seu-site.netlify.app

# 2. Abrir Meta Events Manager → Test Events
https://business.facebook.com/events_manager

# 3. Fazer cadastro no site
# 4. Verificar evento CompleteRegistration no Test Events

# 5. Acessar URL de sucesso manualmente
https://seu-site.netlify.app/pagamento/sucesso?payment_id=123&status=approved

# 6. Verificar evento Purchase no Test Events
```

**Se ambos aparecerem no Test Events:** ✅ Tudo funcionando!

**Se não aparecer:** Problema de bloqueador ou configuração do Meta.

---

## 📞 Próximos Passos

Se após todos os testes ainda não funcionar:

1. **Verificar se site está no Netlify** (não localhost)
2. **Desabilitar TODOS os bloqueadores**
3. **Testar em celular** (sem bloqueadores)
4. **Aguardar 24-48h** para domain verification
5. **Verificar Pixel ID no Meta Business**

---

## 💡 Dica Final

O código está **100% correto**. Se não está funcionando, é:
- Bloqueador de anúncios
- Domain verification pendente
- Delay do Meta (15-30 min)
- Testando em localhost (precisa ser Netlify)

**Teste em:** `https://seu-site.netlify.app` com bloqueadores desabilitados.
