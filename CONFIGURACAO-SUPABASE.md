# Guia de Configuração do Supabase

## 1. CRIAR PROJETO NO SUPABASE

1. Acesse https://supabase.com
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Preencha:
   - **Name**: lech-lecha (ou nome do seu projeto)
   - **Database Password**: Escolha uma senha forte
   - **Region**: Escolha a região mais próxima (ex: South America)
5. Aguarde a criação do projeto (~2 minutos)

## 2. OBTER CREDENCIAIS

### 2.1 URL e Anon Key (Públicas)

1. No dashboard do Supabase, vá em **Settings** → **API**
2. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2.2 Service Role Key (Secreta)

1. Na mesma página (**Settings** → **API**)
2. Copie:
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`
3. ⚠️ **NUNCA exponha esta chave no frontend!**

## 3. CONFIGURAR AUTENTICAÇÃO

### 3.1 Habilitar Email/Password

1. Vá em **Authentication** → **Providers**
2. Certifique-se que **Email** está habilitado
3. Configure:
   - ✅ Enable Email provider
   - ✅ Confirm email (desabilitar para desenvolvimento)
   - ✅ Enable email confirmations (desabilitar para desenvolvimento)

### 3.2 Configurar Email Templates (Opcional)

1. Vá em **Authentication** → **Email Templates**
2. Personalize os templates de:
   - Confirmation
   - Magic Link
   - Reset Password

## 4. CRIAR TABELA user_progress

### 4.1 Executar SQL

1. Vá em **SQL Editor**
2. Clique em **New Query**
3. Cole o seguinte SQL:

```sql
-- Criar tabela user_progress
CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  journey_entry_point TEXT NOT NULL DEFAULT 'app',
  onboarding_complete BOOLEAN NOT NULL DEFAULT false,
  completed_chapter_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  unlocked_piece_indices JSONB NOT NULL DEFAULT '[]'::jsonb,
  reflections JSONB NOT NULL DEFAULT '{}'::jsonb,
  video_positions JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_journey_entry ON public.user_progress(journey_entry_point);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ler seu próprio progresso
CREATE POLICY "Users can read own progress"
  ON public.user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Usuários podem atualizar seu próprio progresso
CREATE POLICY "Users can update own progress"
  ON public.user_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Política: Usuários podem inserir seu próprio progresso
CREATE POLICY "Users can insert own progress"
  ON public.user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Service role pode fazer tudo (para webhook)
CREATE POLICY "Service role can do everything"
  ON public.user_progress
  FOR ALL
  USING (auth.role() = 'service_role');
```

4. Clique em **Run** para executar

### 4.2 Verificar Tabela

1. Vá em **Table Editor**
2. Você deve ver a tabela `user_progress` com as colunas:
   - user_id (uuid, PK)
   - journey_entry_point (text)
   - onboarding_complete (bool)
   - completed_chapter_ids (jsonb)
   - unlocked_piece_indices (jsonb)
   - reflections (jsonb)
   - video_positions (jsonb)
   - last_updated (timestamptz)

## 5. CONFIGURAR VARIÁVEIS DE AMBIENTE

1. Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   copy .env.example .env.local
   ```

2. Preencha com suas credenciais do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
   SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
   ```

## 6. TESTAR INTEGRAÇÃO

### 6.1 Testar Autenticação

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse http://localhost:3000/login

3. Tente fazer login (deve falhar se não houver usuário)

### 6.2 Testar Criação de Usuário via Webhook

1. Faça um pagamento de teste no Mercado Pago

2. Verifique os logs do webhook:
   ```
   ✅ Pagamento aprovado!
   🆕 Criando novo usuário: email@exemplo.com
   ✅ Usuário criado com sucesso: uuid-do-usuario
   📝 Criando registro em user_progress...
   ✅ Registro criado em user_progress
   ```

3. Verifique no Supabase:
   - **Authentication** → **Users**: Deve aparecer o novo usuário
   - **Table Editor** → **user_progress**: Deve ter um registro com `journey_entry_point = 'web_identidade_negociada'`

## 7. SEGURANÇA

### 7.1 Row Level Security (RLS)

✅ **Já configurado** nas políticas acima

- Usuários só podem acessar seus próprios dados
- Service role (webhook) pode acessar tudo

### 7.2 Proteção de Rotas

✅ **Já configurado** no `middleware.ts`

- Rotas `/teste`, `/resultado`, `/leitura`, `/acesso` exigem autenticação
- Usuários não autenticados são redirecionados para `/login`

### 7.3 Variáveis de Ambiente

⚠️ **NUNCA commite** o arquivo `.env.local`

- Já está no `.gitignore`
- Use `.env.example` como referência

## 8. INTEGRAÇÃO COM APP FLUTTER

### 8.1 Reconhecimento do Usuário

O app Flutter deve verificar o campo `journey_entry_point` ao fazer login:

```dart
final userProgress = await supabase
  .from('user_progress')
  .select()
  .eq('user_id', user.id)
  .single();

if (userProgress['journey_entry_point'] == 'web_identidade_negociada') {
  // Usuário veio do site
  // Ativar fluxo silencioso
  // Não mostrar onboarding padrão
}
```

### 8.2 Fluxo Silencioso

Quando `journey_entry_point = 'web_identidade_negociada'`:

- ✅ Pular onboarding
- ✅ Reconhecer como "já iniciado"
- ✅ Ir direto para conteúdo principal
- ✅ Manter continuidade da experiência web

## 9. TROUBLESHOOTING

### Erro: "Invalid API key"

- Verifique se as chaves estão corretas no `.env.local`
- Reinicie o servidor de desenvolvimento

### Erro: "Row Level Security policy violation"

- Verifique se as políticas RLS foram criadas corretamente
- Execute novamente o SQL do passo 4.1

### Erro: "User already registered"

- Normal se o email já foi usado
- O webhook detecta e não cria usuário duplicado

### Webhook não está funcionando

- Verifique se a URL do webhook está configurada no Mercado Pago
- Verifique os logs do console
- Teste localmente com ngrok ou similar

## 10. PRÓXIMOS PASSOS

1. ✅ Configurar Supabase
2. ✅ Criar tabela user_progress
3. ✅ Configurar variáveis de ambiente
4. ✅ Testar autenticação
5. ✅ Testar webhook
6. 🔄 Implementar envio de email com credenciais
7. 🔄 Integrar com app Flutter
8. 🔄 Deploy em produção

## 11. RECURSOS

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase + Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
