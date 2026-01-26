#!/bin/bash

echo "🚀 Iniciando build para Hostinger..."

# 1. Limpar builds anteriores
echo "🧹 Limpando builds anteriores..."
rm -rf out/
rm -rf .next/

# 2. Gerar build estático
echo "📦 Gerando build estático..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build. Verifique os erros acima."
    exit 1
fi

# 3. Criar .htaccess
echo "⚙️ Criando .htaccess..."
cat > out/.htaccess << 'EOF'
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
EOF

# 4. Criar arquivo ZIP para upload
echo "📦 Criando arquivo ZIP..."
cd out/
zip -r ../hostinger-deploy.zip . > /dev/null 2>&1
cd ..

echo ""
echo "✅ Build concluído com sucesso!"
echo ""
echo "📁 Arquivos estáticos em: ./out/"
echo "📦 Arquivo ZIP em: ./hostinger-deploy.zip"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📤 PRÓXIMOS PASSOS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Opção 1 - Upload via File Manager:"
echo "  1. Acesse o painel da Hostinger"
echo "  2. Vá em 'File Manager'"
echo "  3. Navegue até 'public_html/'"
echo "  4. DELETE todo o conteúdo atual"
echo "  5. Faça upload de TODO o conteúdo da pasta 'out/'"
echo ""
echo "Opção 2 - Upload via ZIP:"
echo "  1. Faça upload do arquivo 'hostinger-deploy.zip'"
echo "  2. Extraia dentro de 'public_html/'"
echo "  3. Delete o arquivo ZIP após extrair"
echo ""
echo "Opção 3 - Upload via FTP:"
echo "  1. Conecte via FTP (use FileZilla ou similar)"
echo "  2. Navegue até 'public_html/'"
echo "  3. DELETE todo o conteúdo atual"
echo "  4. Envie TODO o conteúdo da pasta 'out/'"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  IMPORTANTE:"
echo "   - Certifique-se de que o arquivo .htaccess foi enviado"
echo "   - Aguarde 5-10 minutos para propagação"
echo "   - Teste em modo anônimo após deploy"
echo ""
