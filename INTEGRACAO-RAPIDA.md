# Integração Rápida - Identidade Negociada ↔ Lech Lecha

## 🎯 O que mudou no Supabase?

Apenas **2 campos novos** na tabela `user_progress`:

```sql
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS nome TEXT;
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS whatsapp TEXT;
```

**Pronto!** Só isso no banco de dados.

---

## 🔑 Como identificar usuários do site?

```dart
journey_entry_point == 'web_identidade_negociada'
```

---

## 📦 Dados que o site envia para o Supabase

Quando um usuário se cadastra no site, o registro em `user_progress` fica assim:

```json
{
  "user_id": "<UUID>",
  "nome": "João Silva",
  "whatsapp": "(11) 99999-9999",
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

## 🔄 O que o app Flutter precisa fazer?

### 1. Atualizar modelo `UserProgress`

```dart
class UserProgress {
  final String userId;
  final String? nome; // NOVO
  final String? whatsapp; // NOVO
  final String journeyEntryPoint;
  // ... resto dos campos
}
```

### 2. Verificar origem no login

```dart
// Buscar user_progress
final userProgress = await supabase
  .from('user_progress')
  .select()
  .eq('user_id', userId)
  .single();

// Verificar se veio do site
if (userProgress['journey_entry_point'] == 'web_identidade_negociada') {
  // Usuário do site - ativar fluxo silencioso
  _handleWebUser(userProgress);
} else {
  // Usuário nativo - fluxo normal
  _handleNativeUser(userProgress);
}
```

### 3. Implementar fluxo silencioso

```dart
void _handleWebUser(UserProgress userProgress) {
  // Usuário já leu "Identidade Negociada" no site
  // Não mostrar onboarding genérico
  // Dar continuidade ao conteúdo
  
  Navigator.pushReplacement(
    context,
    MaterialPageRoute(builder: (context) => ContinuidadeScreen()),
  );
}
```

---

## ✅ Checklist Mínimo

- [ ] Executar SQL no Supabase (2 comandos acima)
- [ ] Adicionar `nome` e `whatsapp` ao modelo `UserProgress`
- [ ] Verificar `journey_entry_point` no login
- [ ] Implementar fluxo silencioso para `'web_identidade_negociada'`

---

## 🎯 Resultado

Usuários do site são reconhecidos automaticamente pelo app e têm fluxo específico (sem onboarding genérico, continuidade do conteúdo).

---

## 📄 Documentação Completa

Para detalhes completos, veja: `PROMPT-INTEGRACAO-LECH-LECHA.md`
