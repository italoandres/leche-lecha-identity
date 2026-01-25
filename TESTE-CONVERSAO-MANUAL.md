# 🧪 Teste Manual da Conversão Purchase

## Problema Identificado

Você está usando credenciais de **PRODUÇÃO** do Mercado Pago, então não pode usar cartões de teste.

---

## ✅ Solução 1: Teste Manual da Conversão (Mais Rápido)

### Passo 1: Acesse a URL com Parâmetros

Acesse diretamente a página de sucesso com os parâmetros que o Mercado Pago enviaria:

```
https://seu-site.netlify.app/pagamento/sucesso?payment_id=123456789&status=approved
```

**Substitua:**
- `seu-site.netlify.app` pela URL real do seu site no Netlify

### Passo 2: Abra o Console do Navegador

1. Pressione `F12` para abrir as ferramentas de desenvolvedor
2. Vá na aba "Console"
3. Procure pela mensagem: `Meta Pixel: Purchase event tracked - R$ 29,90`

### Passo 3: Verifique o Facebook Pixel Helper

1. Instale a extensão: [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Com a extensão instalada, acesse a URL do passo 1
3. Clique no ícone da extensão
4. Deve mostrar: ✅ `Purchase` disparado com valor 29.90 BRL

### Passo 4: Verifique no Facebook Events Manager

1. Acesse: https://business.facebook.com/events_manager
2. Selecione seu Pixel
3. Vá em "Test Events"
4. Acesse a URL do passo 1
5. O evento `Purchase` deve aparecer em tempo real

---

## ✅ Solução 2: Configurar Ambiente de Teste (Mais Completo)

Se você quiser testar o fluxo completo com cartões de teste, precisa usar credenciais de **TESTE** do Mercado Pago.

### Passo 1: Obter Credenciais de Teste

1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Vá em "Suas integrações" → Selecione sua aplicação
3. Vá em "Credenciais de teste"
4. Copie:
   - **Public Key de Teste** (começa com `TEST-...`)
   - **Access Token de Teste** (começa com `TEST-...`)

### Passo 2: Criar Variáveis de Ambiente de Teste no Netlify

1. Acesse: https://app.netlify.com/
2. Vá no seu site
3. Vá em "Site settings" → "Environment variables"
4. Crie novas variáveis (ou edite as existentes):

```
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=TEST-sua-public-key-de-teste
MERCADOPAGO_ACCESS_TOKEN=TEST-seu-access-token-de-teste
```

5. Clique em "Save"
6. Faça um novo deploy (ou clique em "Trigger deploy")

### Passo 3: Testar com Cartões de Teste

Agora você pode usar os cartões de teste do Mercado Pago:

#### Cartão Aprovado
```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/25
Nome: APRO (qualquer nome)
CPF: Qualquer CPF válido
```

#### Outros Cartões de Teste

**Pagamento Aprovado:**
- Mastercard: `5031 4332 1540 6351`
- Visa: `4509 9535 6623 3704`

**Pagamento Recusado:**
- `5031 7557 3453 0604` (recusado por fundos insuficientes)

**Pagamento Pendente:**
- `5031 4332 1540 6351` + escolher "Boleto"

### Passo 4: Fazer o Teste Completo

1. Acesse: `https://seu-site.netlify.app/checkout`
2. Complete o checkout
3. Use um dos cartões de teste acima
4. Após aprovação, você será redirecionado para `/pagamento/sucesso?payment_id=...&status=approved`
5. O evento `Purchase` será disparado

---

## ✅ Solução 3: Teste em Produção com Pagamento Real (Não Recomendado)

Se você quiser testar com um pagamento real:

1. Complete o checkout normalmente
2. Use um cartão real
3. Faça um pagamento de R$ 29,90
4. Após aprovação, verifique se o evento foi disparado
5. **Importante:** Você pode cancelar/estornar o pagamento depois no painel do Mercado Pago

---

## 🔍 Como Verificar se a Conversão Está Funcionando

### Método 1: Console do Navegador (Mais Rápido)

1. Acesse: `https://seu-site.netlify.app/pagamento/sucesso?payment_id=123&status=approved`
2. Abra o console (F12)
3. Procure: `Meta Pixel: Purchase event tracked - R$ 29,90`

**Se aparecer:** ✅ Conversão está funcionando!

### Método 2: Facebook Pixel Helper

1. Instale a extensão
2. Acesse a URL com parâmetros
3. Clique no ícone da extensão
4. Deve mostrar: `Purchase` com valor 29.90 BRL

**Se aparecer:** ✅ Conversão está funcionando!

### Método 3: Facebook Events Manager

1. Acesse: https://business.facebook.com/events_manager
2. Vá em "Test Events"
3. Acesse a URL com parâmetros
4. O evento deve aparecer em tempo real

**Se aparecer:** ✅ Conversão está funcionando!

---

## 🐛 Troubleshooting

### Problema: Evento não dispara

**Verifique:**
1. URL tem `payment_id` ou `status=approved`?
2. Meta Pixel está carregado? (use Pixel Helper)
3. Console mostra algum erro?
4. Está acessando via HTTPS?

### Problema: Evento dispara mas não aparece no Events Manager

**Possíveis causas:**
1. Delay de alguns minutos (normal)
2. Pixel ID incorreto
3. Bloqueador de anúncios ativo
4. Navegação em modo anônimo

### Problema: Acesso direto dispara o evento

**Isso NÃO deveria acontecer!**

Se acessar `https://seu-site.netlify.app/pagamento/sucesso` (sem parâmetros) e o evento disparar, há um bug.

**Verifique:**
1. Console mostra a mensagem de tracking?
2. Pixel Helper mostra o evento?

Se sim, me avise que vou corrigir o código.

---

## 📊 Resumo das Opções

| Opção | Velocidade | Completude | Recomendação |
|-------|-----------|------------|--------------|
| **Teste Manual** | ⚡ Imediato | Testa só o Pixel | ✅ Recomendado para verificar conversão |
| **Credenciais de Teste** | 🕐 15 minutos | Testa fluxo completo | ✅ Recomendado para desenvolvimento |
| **Pagamento Real** | 💰 Custa R$ 29,90 | Testa tudo em produção | ⚠️ Não recomendado para teste |

---

## ✅ Recomendação Final

**Para testar a conversão AGORA:**
1. Acesse: `https://seu-site.netlify.app/pagamento/sucesso?payment_id=123&status=approved`
2. Abra o console (F12)
3. Procure: `Meta Pixel: Purchase event tracked - R$ 29,90`
4. Use o Pixel Helper para confirmar

**Para testar o fluxo completo depois:**
1. Configure credenciais de TESTE no Netlify
2. Use cartões de teste do Mercado Pago
3. Teste o fluxo completo: checkout → pagamento → conversão

---

## 🎯 Próximos Passos

Depois de confirmar que a conversão está funcionando:

1. ✅ Configure como conversão no Ads Manager
2. ✅ Crie campanhas otimizadas para Purchase
3. ✅ Configure ROAS (Return on Ad Spend)
4. ✅ Crie públicos de compradores
5. ✅ Adicione `InitiateCheckout` no checkout

---

## 📞 Precisa de Ajuda?

Se o evento não disparar mesmo com os parâmetros corretos, me avise e vou investigar!
