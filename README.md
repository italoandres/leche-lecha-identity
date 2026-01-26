# Identidade Negociada - Lech Lecha

Portal web de entrada para o ecossistema Lech Lecha, integrado ao backend Supabase compartilhado.

## 🎯 Visão Geral

Este não é um sistema independente. É a **porta de entrada web** para o app Lech Lecha, compartilhando o mesmo backend Supabase.

### Fluxo do Usuário

1. **Landing** → Apresentação do teste
2. **Checkout** → Pagamento (R$ 29,90)
3. **Webhook** → Criação automática de usuário no Supabase
4. **Login** → Acesso com credenciais enviadas por email
5. **Teste** → Questionário de diagnóstico
6. **Resultado** → Interpretação personalizada
7. **Leitura** → Conteúdo "Identidade Negociada" (7 capítulos)
8. **Continuidade** → Transição para o app Lech Lecha

## 🚀 Quick Start

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
copy .env.example .env.local
```

Preencha com suas credenciais:
- Supabase (URL, anon key, service role key)
- Mercado Pago (public key, access token)
- OpenAI (API key)

### 3. Configurar Supabase

Siga o guia completo em: **`CONFIGURACAO-SUPABASE.md`**

Resumo:
1. Criar projeto no Supabase
2. Executar SQL para criar tabela `user_progress`
3. Configurar RLS (Row Level Security)
4. Obter credenciais

### 4. Rodar Localmente

```bash
npm run dev
```

Acesse: http://localhost:3000

## 📚 Documentação

### Arquitetura
- **`ARQUITETURA-SUPABASE.md`** - Visão geral da arquitetura
- **`CONFIGURACAO-SUPABASE.md`** - Guia de configuração passo a passo
- **`IMPLEMENTACAO-COMPLETA.md`** - Detalhes da implementação
- **`RESUMO-INTEGRACAO.md`** - Resumo executivo

### Outros
- **`COMANDOS-UTEIS.md`** - Comandos úteis para desenvolvimento
- **`INTEGRACAO-MERCADO-PAGO.md`** - Guia de integração com Mercado Pago
- **`FLUXO-COMPLETO.md`** - Fluxo completo do usuário

## 🔑 Tecnologias

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth + Database)
- **Pagamento**: Mercado Pago
- **IA**: OpenAI GPT-4
- **Animações**: Framer Motion

## 🏗️ Estrutura do Projeto

```
├── app/
│   ├── api/
│   │   ├── create-preference/    # Criar preferência de pagamento
│   │   ├── diagnostico/           # Gerar diagnóstico com IA
│   │   └── webhook/               # Webhook Mercado Pago + Supabase
│   ├── acesso/                    # Página de acesso liberado
│   ├── app-redirect/              # Redirecionamento para app
│   ├── checkout/                  # Página de checkout
│   ├── leitura/                   # Livro "Identidade Negociada"
│   │   └── continuidade/          # Transição para app
│   ├── login/                     # Login com Supabase
│   ├── pagamento/                 # Páginas de retorno do pagamento
│   ├── resultado/                 # Resultado do teste
│   └── teste/                     # Questionário
├── components/                    # Componentes React
├── contexts/
│   └── AuthContext.tsx            # Contexto de autenticação
├── lib/
│   ├── supabase.ts                # Cliente Supabase
│   ├── questions.ts               # Perguntas do teste
│   ├── scoring.ts                 # Sistema de pontuação
│   └── aiPrompt.ts                # Prompts para IA
└── middleware.ts                  # Proteção de rotas
```

## 🔐 Segurança

### Row Level Security (RLS)
- Usuários só acessam seus próprios dados
- Service role (webhook) tem acesso total
- Políticas configuradas para SELECT, UPDATE, INSERT

### Proteção de Rotas
- Middleware verifica autenticação
- Rotas protegidas: `/teste`, `/resultado`, `/leitura`, `/acesso`
- Redirecionamento automático para `/login`

### Variáveis de Ambiente
- Service role key nunca exposta no frontend
- `.env.local` no `.gitignore`
- `.env.example` como referência

## 📱 Integração com App Flutter

O app Flutter reconhece automaticamente usuários vindos do site através do campo `journey_entry_point` na tabela `user_progress`.

### No App Flutter:

```dart
final userProgress = await supabase
  .from('user_progress')
  .select()
  .eq('user_id', user.id)
  .single();

if (userProgress['journey_entry_point'] == 'web_identidade_negociada') {
  // Usuário veio do site
  // Ativar fluxo silencioso
  // Pular onboarding
}
```

## 🧪 Testes

### Testar Pagamento
1. Acesse: http://localhost:3000/checkout
2. Use cartão de teste do Mercado Pago
3. Verifique logs do webhook

### Testar Autenticação
1. Faça um pagamento de teste
2. Verifique email com credenciais (logs do console)
3. Acesse: http://localhost:3000/login
4. Faça login com as credenciais

### Verificar Supabase
1. **Authentication** → **Users**: Usuário criado
2. **Table Editor** → **user_progress**: Registro com `journey_entry_point = 'web_identidade_negociada'`

## 🚀 Deploy

### Netlify (Ambiente Oficial de Produção)

O projeto está configurado para deploy automático no Netlify via GitHub.

**Deploy Automático:**
```bash
git add .
git commit -m "Sua mensagem"
git push origin main
```

O Netlify detecta o push e faz deploy automático em ~2 minutos.

**Deploy Manual:**
```bash
netlify deploy --prod
```

### Configuração no Netlify

1. **Variáveis de Ambiente** (Site Settings → Environment Variables):
   - Supabase (URL, anon key, service role key)
   - Mercado Pago (public key, access token)
   - OpenAI (API key)
   - Resend (API key)
   - Base URL

2. **Webhook do Mercado Pago**:
   - URL: `https://seu-site.netlify.app/api/webhook`
   - Eventos: `payment`

3. **DNS do Resend**:
   - Configurar registros TXT e MX

### Documentação Completa

- **AMBIENTE-PRODUCAO.md** - Configuração completa do ambiente
- **CHECKLIST-DEPLOY-NETLIFY.md** - Checklist passo a passo
- **REVERSAO-NETLIFY.md** - Detalhes técnicos da estrutura

## ⚠️ Importante

1. **Ambiente de Produção**: Netlify (estrutura completa com API routes)
2. **Webhook**: Configurar URL no Mercado Pago após deploy
3. **Credenciais**: Usar credenciais de PRODUÇÃO do Mercado Pago
4. **Domínio**: Adicionar no Supabase (Authentication → URL Configuration)
5. **DNS**: Configurar registros do Resend para envio de emails

## 📞 Suporte

- **Supabase**: https://supabase.com/docs
- **Next.js**: https://nextjs.org/docs
- **Mercado Pago**: https://www.mercadopago.com.br/developers

## 📄 Licença

Propriedade de Lech Lecha. Todos os direitos reservados.

---

**Implementação completa e pronta para uso.**

Siga `CONFIGURACAO-SUPABASE.md` para começar.
