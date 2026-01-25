# Arquitetura de Integração Supabase - Identidade Negociada

## 1. VISÃO GERAL

O site Identidade Negociada é a **porta de entrada web** para o ecossistema Lech Lecha.

**NÃO é um sistema independente**. É uma extensão web que compartilha o mesmo backend Supabase do app Flutter.

## 2. BACKEND COMPARTILHADO

### Supabase Auth
- **Método**: Email/Senha
- **Flow**: PKCE (Proof Key for Code Exchange)
- **Provider**: Supabase Auth nativo

### Supabase Database
- **Tabela única**: `user_progress`
- **Não criar novas tabelas**
- **Não duplicar estado**

### Estrutura da tabela `user_progress`:
```sql
{
  user_id: UUID (PK, FK -> auth.users)
  journey_entry_point: TEXT
  onboarding_complete: BOOLEAN
  completed_chapter_ids: JSONB
  unlocked_piece_indices: JSONB
  reflections: JSONB
  video_positions: JSONB
  last_updated: TIMESTAMP
}
```

## 3. FLUXO DE AUTENTICAÇÃO

### 3.1 Novo Usuário (Sign Up)
```
1. Usuário preenche email + senha
2. Supabase Auth cria usuário
3. Retorna: user.id (UUID)
4. Sistema insere registro em user_progress
```

### 3.2 Usuário Existente (Sign In)
```
1. Usuário preenche email + senha
2. Supabase Auth valida credenciais
3. Retorna: user.id (UUID)
4. Sistema verifica user_progress
```

## 4. ESCRITA NO SUPABASE

### Momento: Após pagamento confirmado

```typescript
// UPSERT obrigatório
await supabase
  .from('user_progress')
  .upsert({
    user_id: user.id,
    journey_entry_point: 'web_identidade_negociada',
    onboarding_complete: false,
    completed_chapter_ids: [],
    unlocked_piece_indices: [],
    reflections: {},
    video_positions: {},
    last_updated: new Date().toISOString()
  }, {
    onConflict: 'user_id'
  });
```

## 5. FLUXO COMPLETO DO USUÁRIO

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Landing Page (/)                                         │
│    - Apresentação do teste                                  │
│    - CTA: "Iniciar Teste"                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Checkout (/checkout)                                     │
│    - Formulário: nome + email                               │
│    - Pagamento: Mercado Pago (R$ 29,90)                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Webhook Mercado Pago (/api/webhook)                      │
│    - Valida pagamento                                       │
│    - Cria usuário no Supabase (se não existe)               │
│    - Insere em user_progress                                │
│    - Envia email com credenciais                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Login (/login)                                           │
│    - Email + senha                                          │
│    - Supabase Auth                                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Teste (/teste)                                           │
│    - Questionário (já existente)                            │
│    - Protegido por autenticação                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. Resultado (/resultado)                                   │
│    - Diagnóstico interpretativo                             │
│    - Pontuação + reflexões                                  │
│    - CTA: "Aprofundar entendimento"                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. Leitura (/leitura)                                       │
│    - Introdução + 7 capítulos                               │
│    - Typewriter effect na intro                             │
│    - Navegação fluida                                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 8. Continuidade (/leitura/continuidade)                     │
│    - Transição para app                                     │
│    - Marca: journey_entry_point                             │
│    - CTA: "Continuar" → App Lech Lecha                      │
└─────────────────────────────────────────────────────────────┘
```

## 6. VARIÁVEIS DE AMBIENTE

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role

# Mercado Pago
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-xxx
MP_ACCESS_TOKEN=APP_USR-xxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 7. SEGURANÇA

### Row Level Security (RLS)
```sql
-- Usuário só pode ler/atualizar seu próprio progresso
CREATE POLICY "Users can read own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);
```

## 8. RECONHECIMENTO NO APP FLUTTER

O app Flutter deve:

1. Verificar `journey_entry_point` ao fazer login
2. Se `journey_entry_point = 'web_identidade_negociada'`:
   - Ativar fluxo silencioso
   - Não mostrar onboarding padrão
   - Reconhecer usuário como "já iniciado"

## 9. REGRAS ABSOLUTAS

❌ **NÃO FAZER:**
- Criar tabelas próprias
- Duplicar estado de progresso
- Criar onboarding paralelo
- Implementar lógica de capítulos própria
- Criar sistema de autenticação próprio

✅ **FAZER:**
- Usar Supabase Auth exclusivamente
- Escrever em `user_progress` apenas
- Preparar usuário para o app
- Manter identidade visual consistente
- Fluxo silencioso e introspectivo

## 10. PRÓXIMOS PASSOS DE IMPLEMENTAÇÃO

1. Instalar Supabase SDK
2. Configurar cliente Supabase
3. Criar contexto de autenticação
4. Implementar páginas protegidas
5. Integrar webhook com Supabase
6. Criar página de login
7. Atualizar fluxo de continuidade
8. Testar integração completa
