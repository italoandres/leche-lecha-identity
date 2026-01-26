@echo off
echo.
echo ========================================
echo   BUILD PARA HOSTINGER
echo ========================================
echo.

echo [1/4] Limpando builds anteriores...
if exist out rmdir /s /q out
if exist .next rmdir /s /q .next

echo [2/4] Gerando build estatico...
call npm run build

if %errorlevel% neq 0 (
    echo.
    echo ERRO: Build falhou. Verifique os erros acima.
    pause
    exit /b 1
)

echo [3/4] Criando .htaccess...
(
echo # Redirecionar para HTTPS
echo RewriteEngine On
echo RewriteCond %%{HTTPS} off
echo RewriteRule ^^(.*^)$ https://%%{HTTP_HOST}%%{REQUEST_URI} [L,R=301]
echo.
echo # Suporte a rotas do Next.js
echo RewriteCond %%{REQUEST_FILENAME} !-f
echo RewriteCond %%{REQUEST_FILENAME} !-d
echo RewriteRule ^^([^^/]+^)/?$ /$1/index.html [L]
echo.
echo # Headers de seguranca
echo ^<IfModule mod_headers.c^>
echo     Header set X-Content-Type-Options "nosniff"
echo     Header set X-Frame-Options "DENY"
echo     Header set Referrer-Policy "origin-when-cross-origin"
echo ^</IfModule^>
echo.
echo # Compressao
echo ^<IfModule mod_deflate.c^>
echo     AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
echo ^</IfModule^>
echo.
echo # Cache
echo ^<IfModule mod_expires.c^>
echo     ExpiresActive On
echo     ExpiresByType image/jpg "access plus 1 year"
echo     ExpiresByType image/jpeg "access plus 1 year"
echo     ExpiresByType image/gif "access plus 1 year"
echo     ExpiresByType image/png "access plus 1 year"
echo     ExpiresByType image/svg+xml "access plus 1 year"
echo     ExpiresByType text/css "access plus 1 month"
echo     ExpiresByType application/javascript "access plus 1 month"
echo     ExpiresByType text/javascript "access plus 1 month"
echo ^</IfModule^>
) > out\.htaccess

echo [4/4] Criando arquivo ZIP...
powershell -command "Compress-Archive -Path out\* -DestinationPath hostinger-deploy.zip -Force"

echo.
echo ========================================
echo   BUILD CONCLUIDO COM SUCESSO!
echo ========================================
echo.
echo Arquivos estaticos em: .\out\
echo Arquivo ZIP em: .\hostinger-deploy.zip
echo.
echo ========================================
echo   PROXIMOS PASSOS
echo ========================================
echo.
echo Opcao 1 - Upload via File Manager:
echo   1. Acesse o painel da Hostinger
echo   2. Va em 'File Manager'
echo   3. Navegue ate 'public_html/'
echo   4. DELETE todo o conteudo atual
echo   5. Faca upload de TODO o conteudo da pasta 'out/'
echo.
echo Opcao 2 - Upload via ZIP:
echo   1. Faca upload do arquivo 'hostinger-deploy.zip'
echo   2. Extraia dentro de 'public_html/'
echo   3. Delete o arquivo ZIP apos extrair
echo.
echo Opcao 3 - Upload via FTP:
echo   1. Conecte via FTP (use FileZilla ou similar^)
echo   2. Navegue ate 'public_html/'
echo   3. DELETE todo o conteudo atual
echo   4. Envie TODO o conteudo da pasta 'out/'
echo.
echo ========================================
echo.
echo IMPORTANTE:
echo   - Certifique-se de que o arquivo .htaccess foi enviado
echo   - Aguarde 5-10 minutos para propagacao
echo   - Teste em modo anonimo apos deploy
echo.
pause
