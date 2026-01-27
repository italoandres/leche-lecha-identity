# 🔥 Integração Hotmart - Guia Completo

## 🎯 Objetivo

Integrar checkout da Hotmart na página `/checkout` com:
- Checkout pré-populado (nome + email do cadastro)
- Webhook para liberação automática
- Email automático via Resend
- Conteúdo na estrutura própria (não usa Hotmart Club)

---

## 📋 Pré-requisitos

- ✅ Conta Hotmart ativa
- ✅ Produto criado na Hotmart
- ✅ Site no Netlify funcionando
- ✅ Supabase configurado
- ✅ Resend configurado

---

## 🔧 Passo 1: Criar Produto na Hotmart

### 1.1. Acessar Hotmart

1. Login: https://app.hotmart.com
2. Menu: **Produtos** → **Meus produtos**
3. Clicar: **Criar novo produto**

### 1.2. Configurar Produto

**Informações Básicas:**
- Nome: `Leitura Personalizada - Narcisismo Materno`
- Categoria: `Desenvolvimento Pessoal`
- Idioma: `Português`
- Tipo: `Curso Online` ou `E-book`

**Preço:**
- Valor: `R$ 29,90` (ou o valor que você quiser)
- Moeda: `BRL`
- Aceitar: `Cartão, Pix, Boleto`

**Importante:**
- ✅ Marcar: "Produto digital"
- ✅ Marcar: "Entrega automática"
- ❌ NÃO usar Hotmart Club (vamos usar estrutura própria)

### 1.3. Obter Link de Checkout

Após criar o produto:
1. Ir em: **Ferramentas** → **Links de pagamento**
2. Copiar: **Link de checkout**
3. Formato: `https://pay.hotmart.com/XXXXXXXX`

---

## 🔗 Passo 2: Configurar Checkout Pré-populado

### 2.1. Estrutura do Link

O link da Hotmart aceita parâmetros na URL para pré-popular dados:

```
https://pay.hotmart.com/XXXXXXXX?name=NOME&email=EMAIL
```

### 2.2. Atualizar Página de Checkout

Vamos modificar `/checkout` para:
1. Pegar nome e email do usuário logado
2. Redirecionar para Hotmart com dados pré-populados

**Código:**

```typescript
// app/checkout/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{ nome: string; email: string } | null>(null);

  useEffect(() => {
    async function loadUserData() {
      if (!user) {
        router.push('/login');
        return;
      }

      // Buscar dados do usuário
      const { data } = await supabase
        .from('user_progress')
        .select('nome')
        .eq('user_id', user.id)
        .single();

      setUserData({
        nome: data?.nome || '',
        email: user.email || '',
      });
      setLoading(false);
    }

    loadUserData();
  }, [user, router]);

  const handleCheckout = () => {
    if (!userData) return;

    // Link da Hotmart com dados pré-populados
    const hotmartLink = `https://pay.hotmart.com/XXXXXXXX?name=${encodeURIComponent(userData.nome)}&email=${encodeURIComponent(userData.email)}`;
    
    // Redirecionar para Hotmart
    window.location.href = hotmartLink;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground/70">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center max-w-lg"
      >
        <h1 className="text-3xl font-light text-foreground mb-8">
          Acesso à Leitura Completa
        </h1>

        <p className="text-foreground/70 font-light mb-12 leading-relaxed">
          Você está prestes a acessar a leitura completa personalizada.
          <br />
          <br />
          Valor: R$ 29,90
        </p>

        <button
          onClick={handleCheckout}
          className="px-16 py-4 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-500 font-light tracking-widest text-sm uppercase"
        >
          Continuar para Pagamento
        </button>
      </motion.div>
    </main>
  );
}
```

**Substitua `XXXXXXXX` pelo código do seu produto Hotmart.**

---

## 🔔 Passo 3: Configurar Webhook da Hotmart

### 3.1. Criar Endpoint de Webhook

Vamos criar um novo endpoint para receber notificações da Hotmart:

```typescript
// app/api/webhook-hotmart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendWelcomeToEcosystemEmail } from '@/lib/resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Webhook Hotmart recebido:', JSON.stringify(body, null, 2));

    // Verificar se é evento de compra aprovada
    if (body.event !== 'PURCHASE_COMPLETE') {
      return NextResponse.json({ received: true });
    }

    const { data } = body;
    const buyerEmail = data.buyer.email;
    const buyerName = data.buyer.name;

    console.log(`Processando compra para: ${buyerEmail}`);

    // Buscar usuário no Supabase
    const { data: authData } = await supabase.auth.admin.listUsers();
    const user = authData.users.find(u => u.email === buyerEmail);

    if (!user) {
      console.error(`Usuário não encontrado: ${buyerEmail}`);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Liberar acesso adicionando "identidade_negociada" em completed_chapter_ids
    const { error: updateError } = await supabase
      .from('user_progress')
      .update({
        completed_chapter_ids: ['identidade_negociada'],
        last_updated: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Erro ao liberar acesso:', updateError);
      return NextResponse.json({ error: 'Failed to grant access' }, { status: 500 });
    }

    console.log(`Acesso liberado para: ${buyerEmail}`);

    // Enviar email de boas-vindas
    try {
      await sendWelcomeToEcosystemEmail(buyerEmail, buyerName);
      console.log(`Email enviado para: ${buyerEmail}`);
    } catch (emailError) {
      console.error('Erro ao enviar email:', emailError);
      // Não falhar o webhook se o email falhar
    }

    return NextResponse.json({ 
      success: true,
      message: 'Access granted and email sent'
    });

  } catch (error: any) {
    console.error('Erro no webhook Hotmart:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed', details: error.message },
      { status: 500 }
    );
  }
}
```

### 3.2. Configurar Webhook na Hotmart

1. **Acessar Hotmart:**
   - Login: https://app.hotmart.com
   - Menu: **Ferramentas** → **Webhooks**

2. **Adicionar Webhook:**
   - URL: `https://seu-site.netlify.app/api/webhook-hotmart`
   - Eventos: Selecionar `PURCHASE_COMPLETE`
   - Versão: `V2`
   - Salvar

3. **Testar Webhook:**
   - Hotmart tem ferramenta de teste
   - Enviar evento de teste
   - Verificar logs no Netlify Functions

---

## 📧 Passo 4: Configurar Página de Retorno

### 4.1. Configurar URLs de Retorno na Hotmart

1. **Acessar produto na Hotmart**
2. **Ir em: Configurações → URLs de retorno**
3. **Configurar:**
   - URL de sucesso: `https://seu-site.netlify.app/bem-vindo`
   - URL de cancelamento: `https://seu-site.netlify.app/checkout`

### 4.2. Página de Boas-Vindas

A página `/bem-vindo` já existe e está configurada corretamente.

O usuário será redirecionado para lá após o pagamento.

---

## 🧪 Passo 5: Testar Fluxo Completo

### 5.1. Teste Manual

1. **Fazer cadastro:**
   - Acessar: `https://seu-site.netlify.app/cadastro`
   - Criar conta com email real

2. **Ir para checkout:**
   - Acessar: `https://seu-site.netlify.app/checkout`
   - Verificar se nome e email aparecem pré-populados na Hotmart

3. **Fazer pagamento:**
   - Usar cartão de teste da Hotmart
   - Completar pagamento

4. **Verificar automações:**
   - Webhook deve processar (verificar logs Netlify)
   - Acesso deve ser liberado (verificar Supabase)
   - Email deve ser enviado (verificar inbox)
   - Redirecionamento para `/bem-vindo`

### 5.2. Cartões de Teste Hotmart

**Cartão aprovado:**
- Número: `4111 1111 1111 1111`
- CVV: `123`
- Validade: Qualquer data futura

**Cartão recusado:**
- Número: `4000 0000 0000 0002`

---

## 📊 Passo 6: Monitoramento

### 6.1. Logs do Webhook

**Netlify Functions:**
- Acessar: Netlify Dashboard → Functions
- Verificar logs de `webhook-hotmart`

### 6.2. Verificar Liberação de Acesso

**Supabase:**
- Table Editor → `user_progress`
- Verificar campo `completed_chapter_ids`
- Deve conter: `["identidade_negociada"]`

### 6.3. Verificar Email

- Inbox do email usado no cadastro
- Assunto: "Seu acesso está liberado"

---

## 🎨 Passo 7: Personalizar Checkout Hotmart

### 7.1. Aparência do Checkout

1. **Acessar Hotmart**
2. **Ir em: Ferramentas → Aparência da página de pagamento**
3. **Personalizar:**
   - Logo: Upload da logo Lech Lecha
   - Cores: Usar paleta do site
   - Depoimentos: Adicionar se tiver
   - Selos de garantia: Adicionar se aplicável

### 7.2. Checkout Transparente (Opcional)

Se quiser checkout ainda mais integrado:
- Usar Hotmart Checkout Transparente
- Requer mais configuração
- Checkout aparece dentro do seu site

---

## 🔄 Passo 8: Remover Mercado Pago

Após confirmar que Hotmart funciona:

1. **Remover arquivos:**
   - `app/api/create-preference/route.ts`
   - `app/api/webhook/route.ts` (antigo)

2. **Remover variáveis do Netlify:**
   - `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`
   - `MERCADOPAGO_ACCESS_TOKEN`

3. **Limpar código:**
   - Remover imports do Mercado Pago
   - Remover referências no código

---

## ✅ Checklist Final

- [ ] Produto criado na Hotmart
- [ ] Link de checkout obtido
- [ ] Página `/checkout` atualizada com link Hotmart
- [ ] Webhook endpoint criado (`/api/webhook-hotmart`)
- [ ] Webhook configurado na Hotmart
- [ ] URLs de retorno configuradas
- [ ] Teste de pagamento realizado
- [ ] Webhook processou corretamente
- [ ] Acesso liberado no Supabase
- [ ] Email enviado
- [ ] Checkout personalizado (logo, cores)
- [ ] Mercado Pago removido

---

## 🎯 Vantagens da Integração

✅ **Checkout otimizado** - 10+ anos de experiência  
✅ **Vendas globais** - Vende no mundo todo  
✅ **Conversão de moeda** - Automática  
✅ **Sem fricção** - Checkout rápido  
✅ **Webhook confiável** - 99.9% uptime  
✅ **Estrutura própria** - Conteúdo no seu site  
✅ **Pré-populado** - Nome e email automáticos  
✅ **Facebook Ads global** - Alcance mundial  

---

## 📞 Suporte

**Hotmart:**
- Documentação: https://developers.hotmart.com
- Suporte: https://atendimento.hotmart.com

**Dúvidas:**
- Webhook não funciona: Verificar logs Netlify
- Email não chega: Verificar Resend
- Acesso não libera: Verificar Supabase

---

## 🚀 Próximos Passos

1. Criar produto na Hotmart
2. Obter link de checkout
3. Atualizar código (vou fazer isso pra você)
4. Configurar webhook
5. Testar fluxo completo
6. Remover Mercado Pago
7. Lançar! 🎉

**Tempo estimado:** 1-2 horas

**Pronto para começar?** Me avisa que eu implemento o código pra você! 🚀
