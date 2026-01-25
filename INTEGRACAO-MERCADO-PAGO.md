# 💳 Integração com Mercado Pago - Guia Completo

## 📋 Pré-requisitos

1. Conta no Mercado Pago (criar em: https://www.mercadopago.com.br)
2. Verificar conta (enviar documentos)
3. Ativar modo vendedor

---

## 🔑 PASSO 1: Obter Credenciais

### 1.1 Acessar o Painel

1. Acesse: https://www.mercadopago.com.br/developers
2. Faça login
3. Vá em **"Suas integrações"** → **"Criar aplicação"**

### 1.2 Criar Aplicação

1. Nome: "Identidade Negociada"
2. Tipo: **Pagamentos online**
3. Clique em **"Criar aplicação"**

### 1.3 Copiar Credenciais

Você verá duas credenciais:

**Modo Teste (para desenvolvimento):**
- `TEST-xxx` (Public Key)
- `TEST-xxx` (Access Token)

**Modo Produção (para site real):**
- `APP_USR-xxx` (Public Key)
- `APP_USR-xxx` (Access Token)

⚠️ **Importante:** Comece sempre com as credenciais de TESTE!

---

## 📦 PASSO 2: Instalar SDK do Mercado Pago

No terminal do projeto:

```bash
npm install mercadopago
```

---

## 🔧 PASSO 3: Configurar Variáveis de Ambiente

Edite o arquivo `.env.local`:

```env
# OpenAI (já existe)
OPENAI_API_KEY=sua-chave-aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Mercado Pago - TESTE (use estas primeiro)
NEXT_PUBLIC_MP_PUBLIC_KEY=TEST-xxx-seu-public-key
MP_ACCESS_TOKEN=TEST-xxx-seu-access-token

# Mercado Pago - PRODUÇÃO (use depois de testar)
# NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-xxx-seu-public-key
# MP_ACCESS_TOKEN=APP_USR-xxx-seu-access-token
```

⚠️ **Atenção:**
- `NEXT_PUBLIC_` = Visível no navegador (Public Key)
- Sem `NEXT_PUBLIC_` = Apenas no servidor (Access Token - SECRETO!)

---

## 💻 PASSO 4: Criar API Route para Criar Preferência

Crie o arquivo: `app/api/create-preference/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

// Configurar Mercado Pago
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Criar preferência de pagamento
    const preference = await mercadopago.preferences.create({
      items: [
        {
          title: 'Identidade Negociada - Material Digital',
          description: 'Acesso ao material completo em 7 capítulos',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 29.90,
        },
      ],
      payer: {
        email: email || 'comprador@email.com',
        name: name || 'Comprador',
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento/sucesso`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento/falha`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento/pendente`,
      },
      auto_return: 'approved',
      statement_descriptor: 'IDENTIDADE NEGOCIADA',
      external_reference: `order_${Date.now()}`, // ID único do pedido
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook`, // Para receber notificações
    });

    return NextResponse.json({
      id: preference.body.id,
      init_point: preference.body.init_point, // URL de pagamento
    });
  } catch (error: any) {
    console.error('Erro ao criar preferência:', error);
    return NextResponse.json(
      { error: 'Erro ao criar pagamento', details: error.message },
      { status: 500 }
    );
  }
}
```

---

## 🛒 PASSO 5: Atualizar Página de Checkout

Substitua o conteúdo de `app/checkout/page.tsx`:

```typescript
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CheckoutPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    if (!email || !name) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Criar preferência de pagamento
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar pagamento');
      }

      const data = await response.json();

      // Redirecionar para página de pagamento do Mercado Pago
      window.location.href = data.init_point;
    } catch (err: any) {
      console.error('Erro:', err);
      setError('Não foi possível processar o pagamento. Tente novamente.');
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-2xl font-light text-foreground mb-2 tracking-wide">
            Acesso
          </h1>
          <p className="text-sm text-muted/60 font-light">
            Identidade Negociada
          </p>
        </motion.div>

        {/* Resumo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-secondary/30 border border-foreground/10 p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-foreground/10">
            <span className="text-foreground/80 font-light">Material digital</span>
            <span className="text-foreground font-light">R$ 29,90</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-foreground font-light">Total</span>
            <span className="text-foreground text-xl font-light">R$ 29,90</span>
          </div>
        </motion.div>

        {/* Formulário */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-4 mb-8"
        >
          <div>
            <label className="block text-foreground/70 text-sm font-light mb-2">
              Nome completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full px-4 py-3 bg-secondary/30 border border-foreground/10 text-foreground font-light focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-foreground/70 text-sm font-light mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-secondary/30 border border-foreground/10 text-foreground font-light focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Erro */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-light text-center">
            {error}
          </div>
        )}

        {/* Botão */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-center"
        >
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className={`
              w-full px-12 py-4 border border-foreground/20 text-foreground 
              hover:bg-foreground/5 transition-all duration-300 font-light 
              tracking-wide text-sm
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isProcessing ? 'Processando...' : 'Ir para pagamento'}
          </button>
          
          <p className="text-muted/60 text-xs font-light mt-6">
            Você será redirecionado para o Mercado Pago
          </p>
        </motion.div>

      </div>
    </main>
  );
}
```

---

## ✅ PASSO 6: Criar Páginas de Retorno

### 6.1 Pagamento Aprovado

Crie: `app/pagamento/sucesso/page.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PagamentoSucessoPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para leitura após 3 segundos
    const timer = setTimeout(() => {
      router.push('/leitura');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        <p className="text-accent text-sm font-light tracking-wider mb-8">
          Acesso liberado
        </p>
        
        <h1 className="text-2xl font-light text-foreground mb-6">
          Pagamento confirmado
        </h1>
        
        <p className="text-foreground/70 font-light mb-8">
          Você será redirecionado para o material em instantes...
        </p>

        <div className="inline-block animate-pulse">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
        </div>
      </motion.div>
    </main>
  );
}
```

### 6.2 Pagamento Pendente

Crie: `app/pagamento/pendente/page.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PagamentoPendentePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        <h1 className="text-2xl font-light text-foreground mb-6">
          Pagamento pendente
        </h1>
        
        <p className="text-foreground/70 font-light mb-8">
          Seu pagamento está sendo processado.<br />
          Você receberá um email quando for confirmado.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-300 font-light text-sm"
        >
          Voltar ao início
        </Link>
      </motion.div>
    </main>
  );
}
```

### 6.3 Pagamento Falhou

Crie: `app/pagamento/falha/page.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PagamentoFalhaPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        <h1 className="text-2xl font-light text-foreground mb-6">
          Pagamento não concluído
        </h1>
        
        <p className="text-foreground/70 font-light mb-8">
          Não foi possível processar seu pagamento.<br />
          Você pode tentar novamente.
        </p>

        <div className="space-y-4">
          <Link
            href="/checkout"
            className="block px-8 py-3 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-300 font-light text-sm"
          >
            Tentar novamente
          </Link>
          
          <Link
            href="/"
            className="block text-muted/70 hover:text-foreground transition-colors font-light text-sm"
          >
            Voltar ao início
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
```

---

## 🔔 PASSO 7: Webhook (Opcional mas Recomendado)

O webhook recebe notificações automáticas do Mercado Pago quando o status do pagamento muda.

Crie: `app/api/webhook/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Webhook recebido:', body);

    // Mercado Pago envia o tipo de notificação
    if (body.type === 'payment') {
      const paymentId = body.data.id;

      // Buscar informações do pagamento
      const payment = await mercadopago.payment.get(paymentId);
      
      console.log('Status do pagamento:', payment.body.status);
      console.log('Email do comprador:', payment.body.payer.email);

      // Aqui você pode:
      // 1. Salvar no banco de dados
      // 2. Enviar email de confirmação
      // 3. Liberar acesso ao conteúdo
      
      if (payment.body.status === 'approved') {
        // Pagamento aprovado!
        console.log('✅ Pagamento aprovado!');
        // TODO: Liberar acesso ao usuário
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Erro no webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}
```

---

## 🧪 PASSO 8: Testar com Cartões de Teste

O Mercado Pago fornece cartões de teste:

### Cartões que APROVAM:
```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/25
Nome: APRO (qualquer nome)
CPF: Qualquer CPF válido
```

### Cartões que RECUSAM:
```
Número: 5031 4332 1540 6351
CVV: 123
Validade: 11/25
Nome: OTHE (para simular recusa)
```

### Mais cartões de teste:
https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards

---

## 🚀 PASSO 9: Colocar em Produção

### 9.1 Trocar Credenciais

No `.env.local`, comente as de teste e descomente as de produção:

```env
# TESTE
# NEXT_PUBLIC_MP_PUBLIC_KEY=TEST-xxx
# MP_ACCESS_TOKEN=TEST-xxx

# PRODUÇÃO
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-xxx
MP_ACCESS_TOKEN=APP_USR-xxx
```

### 9.2 Configurar Webhook em Produção

1. Acesse: https://www.mercadopago.com.br/developers
2. Vá em sua aplicação
3. Configure a URL do webhook:
   ```
   https://seu-dominio.com/api/webhook
   ```

### 9.3 Deploy

```bash
# Fazer deploy na Vercel
vercel --prod

# Ou fazer build e deploy manual
npm run build
```

---

## ✅ Checklist Final

- [ ] Conta Mercado Pago criada e verificada
- [ ] Credenciais de teste copiadas
- [ ] SDK instalado (`npm install mercadopago`)
- [ ] Variáveis de ambiente configuradas
- [ ] API route criada (`/api/create-preference`)
- [ ] Checkout atualizado
- [ ] Páginas de retorno criadas
- [ ] Testado com cartões de teste
- [ ] Webhook configurado (opcional)
- [ ] Credenciais de produção configuradas
- [ ] Deploy realizado

---

## 📞 Suporte

**Documentação oficial:**
https://www.mercadopago.com.br/developers/pt/docs

**Dúvidas comuns:**
- Pagamento pendente = Aguardando confirmação (boleto, PIX)
- Pagamento aprovado = Liberar acesso imediatamente
- Pagamento recusado = Permitir nova tentativa

**Boa sorte com a integração! 🚀**
