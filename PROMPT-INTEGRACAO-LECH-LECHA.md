# Prompt para Integração com Identidade Negociada (Web)

## 📋 Contexto

O site **Identidade Negociada** (Next.js) foi integrado ao Supabase compartilhado do app **Lech Lecha** (Flutter). Usuários que vêm do site precisam ser reconhecidos pelo app e ter um fluxo específico.

---

## 🗄️ Mudanças no Supabase

### Tabela: `user_progress`

**Campos ADICIONADOS:**

```sql
-- Adicionar campo nome (para identificação do usuário)
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS nome TEXT;

-- Adicionar campo whatsapp (para comunicação)
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS whatsapp TEXT;
```

**Campos EXISTENTES (não modificados):**
- `user_id` (UUID) - ID do usuário
- `journey_entry_point` (TEXT) - Ponto de entrada
- `onboarding_complete` (BOOLEAN) - Se completou onboarding
- `completed_chapter_ids` (TEXT[]) - Capítulos completados
- `unlocked_piece_indices` (INTEGER[]) - Conteúdos desbloqueados
- `reflections` (JSONB) - Reflexões do usuário
- `video_positions` (JSONB) - Posições dos vídeos
- `last_updated` (TIMESTAMP) - Última atualização

---

## 🔑 Identificação de Usuários do Site

Usuários que vêm do site **Identidade Negociada** são identificados por:

```dart
journey_entry_point == 'web_identidade_negociada'
```

### Dados Disponíveis

Quando um usuário vem do site, o registro em `user_progress` terá:

```json
{
  "user_id": "<UUID>",
  "nome": "Nome do Usuário",
  "whatsapp": "(00) 00000-0000",
  "journey_entry_point": "web_identidade_negociada",
  "onboarding_complete": false,
  "completed_chapter_ids": [],
  "unlocked_piece_indices": [],
  "reflections": {},
  "video_positions": {},
  "last_updated": "2025-01-24T12:00:00Z"
}
```

---

## 🎯 Requisitos de Integração no App Flutter

### 1. Reconhecer Usuários do Site

Ao fazer login/autenticação, verificar se o usuário veio do site:

```dart
// Buscar user_progress do usuário
final userProgress = await supabase
  .from('user_progress')
  .select()
  .eq('user_id', userId)
  .single();

// Verificar se veio do site
if (userProgress['journey_entry_point'] == 'web_identidade_negociada') {
  // Usuário veio do site - ativar fluxo específico
  _handleWebUser(userProgress);
} else {
  // Usuário nativo do app - fluxo normal
  _handleNativeUser(userProgress);
}
```

### 2. Fluxo Específico para Usuários do Site

Usuários que vêm do site **já leram o conteúdo "Identidade Negociada"** no navegador. O app deve:

1. **Reconhecer que o usuário já iniciou a jornada**
2. **Não mostrar onboarding genérico**
3. **Ativar "fluxo silencioso"** (conforme arquitetura original)
4. **Dar continuidade** ao conteúdo já consumido

### 3. Dados Adicionais Disponíveis

O app agora tem acesso a:

```dart
// Nome do usuário (para personalização)
String nome = userProgress['nome'];

// WhatsApp (para comunicação, se necessário)
String whatsapp = userProgress['whatsapp'];
```

---

## 🔄 Fluxo de Integração

### Cenário 1: Usuário Novo do Site

1. Usuário se cadastra no site (`/cadastro`)
2. Site cria usuário no Supabase Auth
3. Site insere registro em `user_progress` com:
   - `journey_entry_point = 'web_identidade_negociada'`
   - `nome` e `whatsapp` preenchidos
4. Usuário faz teste gratuito
5. Usuário compra e lê o e-book no site
6. Usuário clica em "Continuar" → redireciona para app
7. **App reconhece usuário e ativa fluxo silencioso**

### Cenário 2: Usuário Existente do App

1. Usuário já tem conta no app
2. `journey_entry_point` ≠ `'web_identidade_negociada'`
3. **App mantém fluxo normal**

---

## 📝 Tarefas para o App Flutter

### Tarefa 1: Adicionar Campos ao Modelo `UserProgress`

```dart
class UserProgress {
  final String userId;
  final String? nome; // NOVO
  final String? whatsapp; // NOVO
  final String journeyEntryPoint;
  final bool onboardingComplete;
  final List<String> completedChapterIds;
  final List<int> unlockedPieceIndices;
  final Map<String, dynamic> reflections;
  final Map<String, double> videoPositions;
  final DateTime lastUpdated;

  // ... resto do código
}
```

### Tarefa 2: Criar Função de Verificação

```dart
bool isWebUser(UserProgress userProgress) {
  return userProgress.journeyEntryPoint == 'web_identidade_negociada';
}
```

### Tarefa 3: Implementar Fluxo Silencioso

```dart
void _handleWebUser(UserProgress userProgress) {
  // Usuário veio do site - já leu "Identidade Negociada"
  
  // 1. Não mostrar onboarding genérico
  // 2. Dar boas-vindas personalizadas (opcional)
  // 3. Mostrar continuidade do conteúdo
  // 4. Ativar fluxo silencioso conforme arquitetura original
  
  print('Bem-vindo de volta, ${userProgress.nome}!');
  print('Você já iniciou sua jornada no site.');
  
  // Navegar para tela de continuidade
  Navigator.pushReplacement(
    context,
    MaterialPageRoute(builder: (context) => ContinuidadeScreen()),
  );
}
```

### Tarefa 4: Atualizar Lógica de Autenticação

No arquivo de autenticação/login do app, adicionar verificação:

```dart
Future<void> handleLogin(String email, String password) async {
  // 1. Fazer login no Supabase Auth
  final response = await supabase.auth.signInWithPassword(
    email: email,
    password: password,
  );
  
  final userId = response.user?.id;
  
  if (userId != null) {
    // 2. Buscar user_progress
    final userProgress = await supabase
      .from('user_progress')
      .select()
      .eq('user_id', userId)
      .single();
    
    // 3. Verificar origem
    if (userProgress['journey_entry_point'] == 'web_identidade_negociada') {
      // Usuário do site - fluxo específico
      _handleWebUser(userProgress);
    } else {
      // Usuário nativo - fluxo normal
      _handleNativeUser(userProgress);
    }
  }
}
```

---

## 🔒 Segurança

### Campos Opcionais

Os campos `nome` e `whatsapp` são **opcionais** (nullable) para manter compatibilidade com usuários existentes do app que não têm esses campos preenchidos.

```dart
// Verificar se campos existem antes de usar
if (userProgress.nome != null) {
  print('Nome: ${userProgress.nome}');
}

if (userProgress.whatsapp != null) {
  print('WhatsApp: ${userProgress.whatsapp}');
}
```

### Validação

Sempre validar se `journey_entry_point` existe antes de comparar:

```dart
final entryPoint = userProgress['journey_entry_point'] ?? '';
if (entryPoint == 'web_identidade_negociada') {
  // Usuário do site
}
```

---

## 🧪 Testes

### Teste 1: Usuário Novo do Site

1. Criar conta no site
2. Fazer login no app com as mesmas credenciais
3. Verificar se o app reconhece `journey_entry_point = 'web_identidade_negociada'`
4. Verificar se o fluxo silencioso é ativado

### Teste 2: Usuário Existente do App

1. Fazer login com conta existente do app
2. Verificar se `journey_entry_point` ≠ `'web_identidade_negociada'`
3. Verificar se o fluxo normal é mantido

### Teste 3: Campos Opcionais

1. Fazer login com usuário antigo (sem `nome` e `whatsapp`)
2. Verificar se o app não quebra
3. Verificar se os campos são tratados como `null`

---

## 📊 Resumo das Mudanças

| Componente | Mudança | Tipo |
|------------|---------|------|
| **Supabase** | Adicionar campo `nome` | Novo campo (opcional) |
| **Supabase** | Adicionar campo `whatsapp` | Novo campo (opcional) |
| **App Flutter** | Adicionar campos ao modelo `UserProgress` | Atualização de modelo |
| **App Flutter** | Verificar `journey_entry_point` no login | Nova lógica |
| **App Flutter** | Implementar fluxo silencioso para usuários do site | Nova feature |

---

## ✅ Checklist de Implementação

- [ ] Executar SQL no Supabase (adicionar campos `nome` e `whatsapp`)
- [ ] Atualizar modelo `UserProgress` no Flutter
- [ ] Adicionar verificação de `journey_entry_point` no login
- [ ] Implementar fluxo silencioso para usuários do site
- [ ] Testar com usuário novo do site
- [ ] Testar com usuário existente do app
- [ ] Testar compatibilidade com usuários antigos (sem novos campos)

---

## 🆘 Dúvidas?

Se tiver dúvidas sobre a integração, consulte:

- **Arquitetura completa:** `ARQUITETURA-SUPABASE.md` (no projeto web)
- **Fluxo atualizado:** `FLUXO-ATUALIZADO.md` (no projeto web)
- **SQL necessário:** `SQL-SUPABASE.md` (no projeto web)

---

## 🎯 Objetivo Final

Usuários que vêm do site devem ter uma experiência contínua e silenciosa no app, sem repetir conteúdo já consumido e sem onboarding genérico.

O app deve reconhecer automaticamente que o usuário já iniciou sua jornada no site e dar continuidade de forma natural e elegante.
