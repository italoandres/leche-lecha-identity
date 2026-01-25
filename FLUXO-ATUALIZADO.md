# Fluxo Completo Atualizado - Identidade Negociada

## 🎯 Decisão Estratégica

**TESTE GRATUITO COM CADASTRO OBRIGATÓRIO**

A oferta do e-book (R$ 29,90) acontece **APÓS** o resultado do teste, não antes.

---

## 🔄 Fluxo do Usuário

### 1️⃣ Landing Page (`/`)
- Apresentação do teste
- Botão: **"Começar o Teste"**
- Redireciona para: `/cadastro`

### 2️⃣ Página de Cadastro (`/cadastro`)
- **Campos obrigatórios:**
  - Nome
  - Email
  - Confirmar Email
  - WhatsApp
  - Senha
  - Confirmar Senha
- **Copy:** "Antes de começar, crie seu acesso pessoal"
- **Micro-âncora:** "Este não é um teste genérico"
- **Ação:** Cria usuário no Supabase + registro em `user_progress`
- **Redireciona para:** `/teste`

### 3️⃣ Teste Gratuito (`/teste`)
- 20 perguntas sobre padrões emocionais
- Navegação fluida
- Sem distrações
- **Redireciona para:** `/resultado?score=X`

### 4️⃣ Resultado do Teste (`/resultado`)
- Diagnóstico interpretativo gerado por IA
- Pontuação explícita
- Duas perguntas reflexivas
- **OFERTA DO E-BOOK:**
  - Título: "Identidade Negociada"
  - Preço: R$ 29,90
  - Copy adaptado por faixa de pontuação:
    - **56-80 pontos:** Pitch mais direto (dor consciente)
    - **0-55 pontos:** Pitch mais leve (consciência em formação)
  - Botão: **"Acessar o material completo"**
- **Redireciona para:** `/checkout`

### 5️⃣ Checkout (`/checkout`)
- Integração com Mercado Pago
- Preço: R$ 29,90
- **Após pagamento confirmado:**
  - Webhook atualiza `user_progress` no Supabase
  - Redireciona para: `/leitura`

### 6️⃣ Leitura do E-book (`/leitura`)
- Introdução com efeito typewriter
- 7 capítulos navegáveis
- Tema escuro, minimalista, introspectivo
- Tipografia: Georgia serif
- **Ao final:** Botão "Continuar"
- **Redireciona para:** `/leitura/continuidade`

### 7️⃣ Continuidade (`/leitura/continuidade`)
- Texto: "Você não saiu do lugar onde começou. Mas não está mais no mesmo ponto."
- Botão: **"Continuar"**
- **Redireciona para:** `/app-redirect`

### 8️⃣ Redirecionamento para App (`/app-redirect`)
- Links para App Store e Google Play
- Usuário já está marcado no Supabase como `journey_entry_point = 'web_identidade_negociada'`
- App Flutter reconhece o estado e ativa fluxo silencioso

---

## 🗄️ Integração com Supabase

### Tabela: `user_progress`

**Campos necessários:**
- `user_id` (UUID) - ID do usuário
- `nome` (TEXT) - Nome do usuário
- `whatsapp` (TEXT) - WhatsApp do usuário
- `journey_entry_point` (TEXT) - Sempre `'web_identidade_negociada'`
- `onboarding_complete` (BOOLEAN) - Sempre `false` inicialmente
- `completed_chapter_ids` (TEXT[]) - Array vazio inicialmente
- `unlocked_piece_indices` (INTEGER[]) - Array vazio inicialmente
- `reflections` (JSONB) - Objeto vazio inicialmente
- `video_positions` (JSONB) - Objeto vazio inicialmente
- `last_updated` (TIMESTAMP) - Data/hora da última atualização

### Momentos de Escrita no Supabase

1. **Cadastro (`/cadastro`):**
   - Cria usuário no Supabase Auth
   - Insere registro em `user_progress` com `journey_entry_point = 'web_identidade_negociada'`

2. **Webhook Mercado Pago (`/api/webhook`):**
   - Atualiza `user_progress` após pagamento confirmado
   - Marca acesso liberado

3. **Continuidade (`/leitura/continuidade`):**
   - Atualiza `user_progress` com progresso da leitura

---

## 💳 Integração com Mercado Pago

### Credenciais (Produção)
- **Public Key:** `APP_USR-5caf4f15-cfe4-4b36-b2a5-2d5d07da7889`
- **Access Token:** `APP_USR-2648190945753120-012320-0d302e6be2f232d205ca499de5da6877-3155684582`

### Produto
- **Título:** Identidade Negociada - Acesso Completo
- **Preço:** R$ 29,90
- **Quantidade:** 1

### Webhook
- **URL:** `https://seu-dominio.com/api/webhook`
- **Eventos:** `payment.created`, `payment.updated`

---

## 🎨 Identidade Visual

### Tema
- **Fundo:** Escuro (`bg-background`)
- **Texto:** Claro (`text-foreground`)
- **Estilo:** Minimalista, introspectivo, elegante
- **Sem:** Marketing agressivo, urgência artificial, promessas exageradas

### Tipografia
- **Conteúdo do livro:** Georgia serif
- **Interface:** Sans-serif padrão

### Tom de Voz
- Silencioso
- Sem urgência
- Sem promessa
- Coerente com o app Lech Lecha

---

## ✅ Checklist de Implementação

- [x] Página de cadastro criada
- [x] Integração com Supabase configurada
- [x] Landing page atualizada (redireciona para `/cadastro`)
- [x] Página de resultado atualizada (oferta do e-book)
- [x] Credenciais do Supabase ativadas no `.env.local`
- [ ] **PENDENTE:** Executar SQL no Supabase (adicionar campos `nome` e `whatsapp`)
- [ ] **PENDENTE:** Testar fluxo completo
- [ ] **PENDENTE:** Configurar webhook do Mercado Pago em produção

---

## 🚀 Próximos Passos

1. **Execute os comandos SQL no Supabase** (veja `SQL-SUPABASE.md`)
2. **Reinicie o servidor Next.js:** `npm run dev`
3. **Teste o fluxo completo:**
   - Landing → Cadastro → Teste → Resultado → Checkout → Leitura → Continuidade → App
4. **Verifique no Supabase** se os dados estão sendo salvos corretamente
5. **Configure o webhook do Mercado Pago** em produção quando fizer deploy

---

## 📚 Documentação Relacionada

- `SQL-SUPABASE.md` - Comandos SQL para executar no Supabase
- `ARQUITETURA-SUPABASE.md` - Arquitetura completa da integração
- `CONFIGURACAO-SUPABASE.md` - Guia de configuração do Supabase
- `INTEGRACAO-MERCADO-PAGO.md` - Guia de integração com Mercado Pago
- `CHECKLIST-IMPLEMENTACAO.md` - Checklist completo de implementação
