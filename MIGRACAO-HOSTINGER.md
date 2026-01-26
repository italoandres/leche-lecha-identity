# Migração para Hostinger - Guia Completo

## 📋 Resumo da Migração

Este guia detalha como migrar o site Identidade Negociada do Netlify para hospedagem compartilhada Hostinger.

**Status:** Frontend estático + Backend externo (Supabase)

---

## ⚠️ O que FUNCIONA no modo estático

✅ **Frontend completo:**
- Todas as páginas (home, teste, resultado, leitura, login, cadastro, etc.)
- Meta Pixel do Facebook
- Facebook domain verification
- Eventos de conversão (CompleteRegistration, Purchase)
- Autenticação Supabase (login/cadastro)
- Leitura de dados do Supabase
- Animações e interatividade

✅ **Integrações externas:**
- Supabase Auth (client-side)
- Meta Pixel tracking
- Mercado Pago checkout (redirect)

---

## ❌ O que NÃO funciona (e alternativas)

### 1. API Route: `/api/diagnostico` (OpenAI)
**Problema:** Precisa de servidor para chamar OpenAI API

**Alternativa temporária:**
- Remover teste de diagnóstico OU
- Simplificar para cálculo client-side (sem IA) OU
- Usar Supabase Edge Functions (gratuito, 500k requests/mês)

**Decisão:** Por ora, vamos **remover a página de teste** do build estático. Você pode reativar quando tiver backend.

### 2. API Route: `/api/create-preference` (Mercado Pago)
**Problema:** Precisa de servidor para criar preferência de pagamento

**Alternativa:**
- Usar link de pagamento direto do Mercado Pago OU
- Implementar via Supabase Edge Functions

**Decisão:** Vamos **desabilitar checkout temporariamente**. Quando precisar vender, pode usar link direto do Mercado Pago.

### 3. API Route: `/api/webhook` (Liberação de acesso)
**Problema:** Mercado Pago precisa notificar servidor sobre pagamento

**Alternativa:**
- Liberar acesso manualmente via Supabase OU
- Implementar webhook via Supabase Edge Functions

**Decisão:** **Liberação manual** de acesso por enquanto (você adiciona usuário em `user_progress` manualmente).

---

## 🚀 Passo a Passo da Migração

### Passo 1: Preparar o projeto

```bash
# 1. Atualizar next.config.js (já feito)
# 2. Verificar variáveis de ambiente
```

Crie arquivo `.env.local` com suas variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key_aqui
NEXT_PUBLIC_BASE_URL=https://seudominio.com
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=sua_key_aqui
```

### Passo 2: Gerar build estático

```bash
npm run build
```

Isso vai gerar a pasta `out/` com todos os arquivos estáticos.

### Passo 3: Estrutura gerada

```
out/
├── index.html              # Página inicial
├── 404.html               # Página de erro
├── cadastro/
│   └── index.html
├── login/
│   └── index.html
├── leitura/
│   └── index.html
├── bem-vindo/
│   └── index.html
├── pagamento/
│   ├── sucesso/
│   │   └── index.html
│   └── falha/
│       └── index.html
├── _next/
│   ├── static/            # CSS, JS, fonts
│   └── ...
└── ...
```

### Passo 4: Upload para Hostinger

**Via FTP/File Manager:**

1. Acesse o painel da Hostinger
2. Vá em "File Manager" ou use FTP
3. Navegue até `public_html/`
4. **DELETE tudo** que estiver lá (ou faça backup)
5. **Upload TODO o conteúdo da pasta `out/`** para `public_html/`

**Estrutura final em public_html:**

```
public_html/
├── index.html
├── 404.html
├── cadastro/
├── login/
├── leitura/
├── _next/
└── ...
```

### Passo 5: Configurar .htaccess

Crie arquivo `.htaccess` em `public_html/`:

```apache
# Redirecionar para HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Suporte a rotas do Next.js
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^/]+)/?$ /$1/index.html [L]

# Headers de segurança
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "DENY"
    Header set Referrer-Policy "origin-when-cross-origin"
</IfModule>

# Compressão
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
</IfModule>
```

### Passo 6: Configurar DNS

1. No painel da Hostinger, vá em "DNS/Name Servers"
2. Aponte seu domínio para os nameservers da Hostinger
3. Aguarde propagação (até 48h, geralmente 2-4h)

---

## 🔧 Ajustes Necessários no Código

### 1. Remover páginas que usam API routes

Vamos criar um arquivo para listar páginas a remover do build:

**Páginas a desabilitar temporariamente:**
- `/teste` - usa `/api/diagnostico`
- `/resultado` - depende do teste
- `/checkout` - usa `/api/create-preference`

**Como desabilitar:**

Opção A: Renomear arquivos (mais fácil para reverter):
```bash
mv app/teste/page.tsx app/teste/page.tsx.disabled
mv app/resultado/page.tsx app/resultado/page.tsx.disabled
mv app/checkout/page.tsx app/checkout/page.tsx.disabled
```

Opção B: Adicionar ao `.gitignore` e deletar do build

### 2. Atualizar links internos

Remover links para páginas desabilitadas:

**Em `app/page.tsx`:**
- Remover botão "Fazer Teste" (ou redirecionar para cadastro direto)

**Em `app/resultado/page.tsx`:**
- Remover botão de checkout (ou usar link direto do Mercado Pago)

---

## 📦 Script de Build Automatizado

Crie arquivo `build-hostinger.sh`:

```bash
#!/bin/bash

echo "🚀 Iniciando build para Hostinger..."

# 1. Limpar builds anteriores
rm -rf out/
rm -rf .next/

# 2. Gerar build estático
echo "📦 Gerando build estático..."
npm run build

# 3. Criar .htaccess
echo "⚙️ Criando .htaccess..."
cat > out/.htaccess << 'EOF'
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^/]+)/?$ /$1/index.html [L]

<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "DENY"
    Header set Referrer-Policy "origin-when-cross-origin"
</IfModule>
EOF

# 4. Criar arquivo ZIP para upload
echo "📦 Criando arquivo ZIP..."
cd out/
zip -r ../hostinger-deploy.zip .
cd ..

echo "✅ Build concluído!"
echo "📁 Arquivos em: ./out/"
echo "📦 ZIP em: ./hostinger-deploy.zip"
echo ""
echo "Próximos passos:"
echo "1. Faça upload do conteúdo de 'out/' para 'public_html/' na Hostinger"
echo "2. Ou use o arquivo 'hostinger-deploy.zip' e extraia na Hostinger"
```

Tornar executável:
```bash
chmod +x build-hostinger.sh
```

Executar:
```bash
./build-hostinger.sh
```

---

## 🧪 Testar Localmente

Antes de fazer upload, teste localmente:

```bash
# Instalar servidor HTTP simples
npm install -g serve

# Servir pasta out/
serve out/

# Acessar: http://localhost:3000
```

---

## ✅ Checklist Pós-Deploy

Após fazer upload, verifique:

- [ ] Site carrega em `https://seudominio.com`
- [ ] Meta Pixel está disparando (verificar no Facebook Events Manager)
- [ ] Login funciona (Supabase Auth)
- [ ] Cadastro funciona
- [ ] Leitura carrega corretamente
- [ ] Página de boas-vindas funciona
- [ ] Conversões estão sendo rastreadas
- [ ] SSL está ativo (HTTPS)
- [ ] Todas as rotas funcionam (sem 404)

---

## 🔄 Fluxo de Atualização

Quando precisar atualizar o site:

```bash
# 1. Fazer alterações no código
# 2. Gerar novo build
npm run build

# 3. Upload apenas dos arquivos alterados via FTP
# Ou substituir tudo novamente
```

---

## 💡 Próximos Passos (Quando Tiver Budget)

1. **Implementar backend via Supabase Edge Functions:**
   - Diagnóstico com IA
   - Criação de preferência Mercado Pago
   - Webhook de pagamento
   - Envio de emails

2. **Ou migrar para Vercel/Netlify:**
   - Quando o caixa estabilizar
   - Reativar todas as funcionalidades

---

## 🆘 Troubleshooting

### Problema: Páginas retornam 404
**Solução:** Verificar se `.htaccess` está configurado corretamente

### Problema: CSS/JS não carregam
**Solução:** Verificar se pasta `_next/` foi enviada corretamente

### Problema: Meta Pixel não dispara
**Solução:** Verificar se variáveis de ambiente estão corretas no build

### Problema: Login não funciona
**Solução:** Verificar URLs do Supabase e configuração de redirect

---

## 📞 Suporte

Se tiver dúvidas durante a migração, me avise que te ajudo a resolver!
