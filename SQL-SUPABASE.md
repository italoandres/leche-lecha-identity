# SQL para Executar no Supabase

## 📋 Instruções

Execute estes comandos SQL no **SQL Editor** do Supabase para adicionar os campos necessários à tabela `user_progress`.

---

## 🔧 Comandos SQL

### 1. Adicionar campo `whatsapp`

```sql
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS whatsapp TEXT;
```

### 2. Adicionar campo `nome`

```sql
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS nome TEXT;
```

### 3. Verificar estrutura da tabela (opcional)

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'user_progress'
ORDER BY ordinal_position;
```

---

## ✅ Como Executar

1. Acesse o Supabase Dashboard: https://supabase.com/dashboard
2. Selecione o projeto **Lech Lecha**
3. No menu lateral, clique em **SQL Editor**
4. Clique em **New Query**
5. Cole os comandos SQL acima
6. Clique em **Run** (ou pressione `Ctrl+Enter`)

---

## 📊 Estrutura Final Esperada

Após executar os comandos, a tabela `user_progress` deve ter os seguintes campos:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `user_id` | UUID | ID do usuário (chave primária) |
| `nome` | TEXT | Nome do usuário |
| `whatsapp` | TEXT | WhatsApp do usuário |
| `journey_entry_point` | TEXT | Ponto de entrada (ex: `web_identidade_negociada`) |
| `onboarding_complete` | BOOLEAN | Se completou o onboarding |
| `completed_chapter_ids` | TEXT[] | IDs dos capítulos completados |
| `unlocked_piece_indices` | INTEGER[] | Índices dos conteúdos desbloqueados |
| `reflections` | JSONB | Reflexões do usuário |
| `video_positions` | JSONB | Posições dos vídeos |
| `last_updated` | TIMESTAMP | Última atualização |

---

## 🔒 Segurança

Estes comandos são seguros e apenas **adicionam** campos à tabela existente. Eles **não modificam** nem **deletam** dados existentes.

O `IF NOT EXISTS` garante que o comando não falhará se os campos já existirem.

---

## 🚀 Próximos Passos

Após executar os comandos SQL:

1. ✅ Reinicie o servidor Next.js (`npm run dev`)
2. ✅ Teste o fluxo completo:
   - Landing → Cadastro → Teste → Resultado → Checkout → Leitura
3. ✅ Verifique no Supabase se os dados estão sendo salvos corretamente

---

## 🆘 Problemas?

Se encontrar erros ao executar os comandos:

1. Verifique se você está no projeto correto (Lech Lecha)
2. Verifique se a tabela `user_progress` existe
3. Verifique se você tem permissões de administrador no projeto
4. Entre em contato com o suporte do Supabase se necessário
