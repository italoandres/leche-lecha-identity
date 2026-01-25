# Comandos Úteis - Identidade Negociada

## 🚀 Desenvolvimento

### Instalar dependências
```bash
npm install
```

### Rodar em desenvolvimento
```bash
npm run dev
```

### Build para produção
```bash
npm run build
```

### Rodar produção localmente
```bash
npm start
```

## 🔧 Configuração

### Copiar variáveis de ambiente
```bash
# Windows
copy .env.example .env.local

# Mac/Linux
cp .env.example .env.local
```

### Verificar variáveis
```bash
# Windows
type .env.local

# Mac/Linux
cat .env.local
```

## 🧪 Testes

### Testar webhook localmente (com ngrok)
```bash
# Instalar ngrok
npm install -g ngrok

# Expor porta 3000
ngrok http 3000

# URL do webhook será:
# https://seu-id.ngrok.io/api/webhook
```

### Testar pagamento
1. Acesse: http://localhost:3000/checkout
2. Use cartão de teste do Mercado Pago
3. Verifique logs do webhook no console

### Verificar criação de usuário
1. Acesse: https://supabase.com
2. Vá em **Authentication** → **Users**
3. Verifique se o usuário foi criado

### Verificar user_progress
1. Acesse: https://supabase.com
2. Vá em **Table Editor** → **user_progress**
3. Verifique se o registro foi criado com `journey_entry_point = 'web_identidade_negociada'`

## 📊 Supabase

### Executar SQL
1. Acesse: https://supabase.com
2. Vá em **SQL Editor**
3. Cole o SQL de `CONFIGURACAO-SUPABASE.md`
4. Clique em **Run**

### Ver logs
1. Acesse: https://supabase.com
2. Vá em **Logs** → **API**
3. Filtre por erros ou sucesso

### Resetar tabela (CUIDADO!)
```sql
-- Deletar todos os registros
DELETE FROM public.user_progress;

-- Deletar tabela
DROP TABLE IF EXISTS public.user_progress CASCADE;
```

## 🔐 Autenticação

### Criar usuário manualmente (para testes)
```sql
-- No SQL Editor do Supabase
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'teste@exemplo.com',
  crypt('senha123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);
```

### Listar usuários
```sql
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC;
```

### Deletar usuário
```sql
-- Substitua o UUID pelo ID do usuário
DELETE FROM auth.users WHERE id = 'uuid-do-usuario';
```

## 📧 Email (Placeholder)

### Testar envio de email
Atualmente é um placeholder. Para implementar:

1. Escolha um serviço:
   - Resend (recomendado)
   - SendGrid
   - AWS SES

2. Instale o SDK:
```bash
npm install resend
```

3. Atualize `app/api/webhook/route.ts`:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendCredentialsEmail(email: string, password: string) {
  await resend.emails.send({
    from: 'Lech Lecha <noreply@lechlecha.com>',
    to: email,
    subject: 'Suas credenciais de acesso',
    html: `
      <p>Olá,</p>
      <p>Seu acesso foi liberado!</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Senha:</strong> ${password}</p>
      <p>Acesse: https://seu-dominio.com/login</p>
    `
  });
}
```

## 🐛 Debug

### Ver logs do webhook
```bash
# No terminal onde está rodando npm run dev
# Os logs aparecerão automaticamente
```

### Ver logs do Supabase
```bash
# No console do navegador (F12)
# Ou nos logs do Supabase dashboard
```

### Limpar cache do Next.js
```bash
# Windows
rmdir /s /q .next

# Mac/Linux
rm -rf .next

# Depois
npm run dev
```

## 🚀 Deploy

### Vercel
```bash
# Instalar CLI
npm install -g vercel

# Deploy
vercel

# Deploy em produção
vercel --prod
```

### Netlify
```bash
# Instalar CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Deploy em produção
netlify deploy --prod
```

### Configurar variáveis no Vercel
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_MP_PUBLIC_KEY
vercel env add MP_ACCESS_TOKEN
vercel env add NEXT_PUBLIC_APP_URL
vercel env add OPENAI_API_KEY
```

## 📱 App Flutter

### Verificar journey_entry_point
```dart
final supabase = Supabase.instance.client;

final userProgress = await supabase
  .from('user_progress')
  .select()
  .eq('user_id', user.id)
  .single();

print('Journey entry point: ${userProgress['journey_entry_point']}');
```

### Atualizar progresso
```dart
await supabase
  .from('user_progress')
  .update({
    'onboarding_complete': true,
    'last_updated': DateTime.now().toIso8601String()
  })
  .eq('user_id', user.id);
```

## 🔍 Troubleshooting

### Erro: "Invalid API key"
```bash
# Verificar se as variáveis estão corretas
type .env.local

# Reiniciar servidor
# Ctrl+C e depois npm run dev
```

### Erro: "User already registered"
```bash
# Normal se o email já foi usado
# Deletar usuário no Supabase ou usar outro email
```

### Erro: "Row Level Security policy violation"
```bash
# Executar novamente o SQL de criação das políticas
# Ver CONFIGURACAO-SUPABASE.md
```

### Webhook não funciona
```bash
# 1. Verificar URL no Mercado Pago
# 2. Usar ngrok para testar localmente
# 3. Verificar logs do console
# 4. Verificar se MP_ACCESS_TOKEN está correto
```

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Mercado Pago Docs](https://www.mercadopago.com.br/developers)
- [Vercel Docs](https://vercel.com/docs)

## 💡 Dicas

### Desenvolvimento
- Use `console.log()` liberalmente
- Verifique os logs do Supabase
- Teste com cartões de teste do Mercado Pago

### Produção
- Use variáveis de ambiente de produção
- Configure webhook com URL real
- Monitore logs e erros
- Faça backup do banco de dados

### Segurança
- Nunca commite `.env.local`
- Use HTTPS em produção
- Mantenha service role key segura
- Configure CORS no Supabase se necessário
