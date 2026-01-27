# Correção: Sistema de Checkboxes e Desbloqueio do App

## Problema Identificado

1. **Desbloqueio não funcionava**: A página `/bem-vindo` verificava apenas o flag geral `identidade_negociada`, não os checkboxes individuais dos capítulos
2. **Falta de feedback**: Usuário não sabia quantos capítulos faltavam para desbloquear o app

## Solução Implementada

### 1. Página `/bem-vindo` Atualizada

**Antes:**
- Verificava apenas se `completed_chapter_ids` continha `'identidade_negociada'`
- Não mostrava progresso

**Agora:**
- Verifica se TODOS os 8 capítulos foram marcados individualmente:
  - `intro`, `cap1`, `cap2`, `cap3`, `cap4`, `cap5`, `cap6`, `cap7`
- Mostra contador de progresso: "X/8 completos"
- Desbloqueia botão "Entrar no app" apenas quando todos os 8 capítulos estiverem marcados

### 2. Logs de Debug Adicionados

**Em `lib/supabase.ts`:**
- Logs detalhados em `toggleChapterComplete()`:
  - Quando capítulo é adicionado/removido
  - Estado antes e depois da atualização
  - Confirmação de sucesso no Supabase

**Em `app/bem-vindo/page.tsx`:**
- Log mostrando progresso atual:
  - Capítulos completados
  - Contagem (X/8)
  - Status de desbloqueio

## Como Funciona

### Fluxo de Progresso

1. **Usuário marca checkbox** em `/leitura/capitulos`
   - Chama `toggleChapterComplete(userId, chapterId)`
   - Salva no Supabase em `user_progress.completed_chapter_ids`

2. **Progresso é salvo por usuário**
   - Identificado por `user.id` (UUID do Supabase Auth)
   - Vinculado ao email do usuário
   - Persiste entre sessões

3. **Página `/bem-vindo` verifica progresso**
   - Conta quantos dos 8 capítulos foram marcados
   - Mostra feedback: "X/8 completos"
   - Desbloqueia app quando todos os 8 estiverem marcados

## Estrutura de Dados no Supabase

```typescript
user_progress {
  user_id: string (UUID)
  completed_chapter_ids: string[] // ['intro', 'cap1', 'cap2', ...]
  last_updated: timestamp
}
```

## IDs dos Capítulos

```typescript
const CHAPTER_IDS = [
  'intro',  // Introdução
  'cap1',   // O erro de procurar culpados
  'cap2',   // Antes do rótulo, existiu uma adaptação
  'cap3',   // O papel emocional que você aprendeu a desempenhar
  'cap4',   // Quando o papel começa a se confundir com quem você é
  'cap5',   // Quando o que te sustentou começa a te cansar
  'cap6',   // O medo de existir sem o papel
  'cap7'    // Quando você percebe — e ainda não sabe o que fazer
];
```

## Teste Manual

Para testar:

1. Acesse `/leitura/capitulos`
2. Marque alguns capítulos (não todos)
3. Volte para `/bem-vindo`
4. Verifique que mostra "X/8 completos"
5. Botão "Entrar no app" deve estar desabilitado
6. Marque todos os 8 capítulos
7. Volte para `/bem-vindo`
8. Botão deve estar habilitado

## Logs no Console

Ao marcar/desmarcar capítulos:
```
🔄 toggleChapterComplete chamado: { userId: "...", chapterId: "cap1" }
➕ Adicionando capítulo: cap1
📝 Atualizando Supabase: { userId: "...", before: [], after: ["cap1"] }
✅ Capítulo atualizado com sucesso: { ... }
```

Na página `/bem-vindo`:
```
📊 Progresso: {
  completedChapters: ["intro", "cap1", "cap2"],
  count: 3,
  total: 8,
  unlocked: false
}
```

## Arquivos Modificados

- `app/bem-vindo/page.tsx` - Lógica de desbloqueio baseada em checkboxes
- `lib/supabase.ts` - Logs de debug em `toggleChapterComplete()`

## Próximo Deploy

Aguardar confirmação do usuário antes de fazer commit/push para economizar créditos do Netlify.
