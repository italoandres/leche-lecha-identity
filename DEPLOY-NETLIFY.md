# Guia de Deploy no Netlify

## ✅ Projeto Enviado para GitHub
Repositório: https://github.com/italoandres/leche-lecha-identity

---

## 📋 Passo a Passo para Deploy no Netlify

### 1. Criar Conta no Netlify
1. Acesse: https://www.netlify.com/
2. Clique em "Sign up" (ou "Log in" se já tiver conta)
3. Escolha "Sign up with GitHub" para facilitar a integração

### 2. Importar o Projeto do GitHub
1. No dashboard do Netlify, clique em **"Add new site"** → **"Import an existing project"**
2. Escolha **"Deploy with GitHub"**
3. Autorize o Netlify a acessar seus repositórios (se solicitado)
4. Procure e selecione o repositório: **`italoandres/leche-lecha-identity`**

### 3. Configurar Build Settings
Na tela de configuração, preencha:

**Build command:**
```
npm run build
```

**Publish directory:**
```
.next
```

**Base directory:** (deixe em branco)

### 4. Configurar Variáveis de Ambiente
Antes de fazer o deploy, você PRECISA configurar as variáveis de ambiente:

1. Na mesma tela de configuração, clique em **"Show advanced"**
2. Clique em **"New variable"** e adicione TODAS as variáveis do seu `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key

NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=sua_public_key_do_mercadopago
MERCADOPAGO_ACCESS_TOKEN=seu_access_token_do_mercadopago

OPENAI_API_KEY=sua_chave_da_openai

NEXT_PUBLIC_BASE_URL=https://seu-site.netlify.app
```

⚠️ **IMPORTANTE:** 
- Não coloque as chaves reais aqui neste arquivo
- Use as mesmas chaves que você está usando localmente
- O `NEXT_PUBLIC_BASE_URL` será atualizado depois que você souber a URL do Netlify

### 5. Deploy Inicial
1. Clique em **"Deploy site"**
2. Aguarde o build completar (leva 2-5 minutos)
3. O Netlify vai gerar uma URL aleatória tipo: `https://random-name-123456.netlify.app`

### 6. Atualizar a URL Base
1. Copie a URL gerada pelo Netlify
2. Vá em **"Site settings"** → **"Environment variables"**
3. Edite a variável `NEXT_PUBLIC_BASE_URL` e coloque a URL real do seu site
4. Clique em **"Trigger deploy"** para fazer um novo deploy com a URL correta

### 7. Configurar Domínio Customizado (Opcional)
Se você quiser usar um domínio próprio:

1. Vá em **"Domain settings"**
2. Clique em **"Add custom domain"**
3. Digite seu domínio (ex: `lechlecha.com`)
4. Siga as instruções para configurar o DNS

### 8. Configurar Webhook do Mercado Pago
Agora que você tem a URL de produção, precisa atualizar o webhook:

1. Acesse o painel do Mercado Pago: https://www.mercadopago.com.br/developers
2. Vá em **"Suas integrações"** → Selecione sua aplicação
3. Configure o webhook para: `https://sua-url.netlify.app/api/webhook`

---

## 🔧 Configurações Adicionais Recomendadas

### Configurar Redirects e Rewrites
O Netlify precisa saber como lidar com as rotas do Next.js. Crie um arquivo `netlify.toml` na raiz do projeto:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Habilitar HTTPS
O Netlify habilita HTTPS automaticamente, mas você pode forçar:

1. Vá em **"Domain settings"**
2. Role até **"HTTPS"**
3. Ative **"Force HTTPS"**

---

## 🧪 Testar o Deploy

Depois do deploy, teste:

1. ✅ Página inicial carrega
2. ✅ Cadastro de usuário funciona
3. ✅ Login funciona
4. ✅ Teste de diagnóstico funciona
5. ✅ Checkout do Mercado Pago funciona
6. ✅ Webhook recebe notificações
7. ✅ Leitura personalizada é gerada

---

## 🐛 Troubleshooting

### Erro: "Build failed"
- Verifique os logs de build no Netlify
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se as variáveis de ambiente estão configuradas

### Erro: "Page not found"
- Verifique se o `netlify.toml` está configurado corretamente
- Certifique-se de que o publish directory é `.next`

### Erro: "API routes não funcionam"
- Next.js API routes funcionam automaticamente no Netlify
- Verifique se as variáveis de ambiente estão corretas
- Verifique os logs de função no Netlify

### Webhook não recebe notificações
- Verifique se a URL do webhook está correta no Mercado Pago
- Teste manualmente: `curl -X POST https://sua-url.netlify.app/api/webhook`
- Verifique os logs de função no Netlify

---

## 📊 Monitoramento

O Netlify oferece:
- **Analytics**: Veja quantas pessoas acessam seu site
- **Function logs**: Veja logs das API routes
- **Deploy logs**: Veja o histórico de deploys

Acesse tudo isso no dashboard do Netlify.

---

## 🔄 Deploys Automáticos

Agora, sempre que você fizer push para o GitHub:
```bash
git add .
git commit -m "Sua mensagem"
git push
```

O Netlify vai automaticamente:
1. Detectar o push
2. Fazer o build
3. Fazer o deploy
4. Atualizar o site

---

## 📝 Checklist Final

- [ ] Projeto enviado para GitHub ✅
- [ ] Conta criada no Netlify
- [ ] Projeto importado do GitHub
- [ ] Build settings configurados
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy inicial realizado
- [ ] URL base atualizada
- [ ] Webhook do Mercado Pago atualizado
- [ ] Testes realizados
- [ ] HTTPS habilitado
- [ ] Domínio customizado configurado (opcional)

---

## 🎉 Pronto!

Seu projeto está no ar! Compartilhe a URL e comece a receber usuários.

Se tiver problemas, verifique:
1. Logs de build no Netlify
2. Logs de função no Netlify
3. Console do navegador (F12)
4. Variáveis de ambiente

Boa sorte! 🚀
