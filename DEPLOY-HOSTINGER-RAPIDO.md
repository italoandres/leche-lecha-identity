# Deploy Hostinger - Guia Rápido

## 🚀 Comandos Rápidos

### Windows:
```cmd
build-hostinger.bat
```

### Linux/Mac:
```bash
chmod +x build-hostinger.sh
./build-hostinger.sh
```

---

## 📤 Upload para Hostinger

### Método 1: File Manager (Recomendado)

1. Acesse: https://hpanel.hostinger.com
2. Clique em "File Manager"
3. Navegue até `public_html/`
4. **DELETE tudo** que estiver lá
5. Clique em "Upload"
6. Selecione **TODOS os arquivos** da pasta `out/`
7. Aguarde upload completar
8. Verifique se `.htaccess` foi enviado

### Método 2: ZIP

1. Faça upload do `hostinger-deploy.zip`
2. Clique com botão direito → "Extract"
3. Extraia em `public_html/`
4. Delete o ZIP após extrair

### Método 3: FTP

**Configurações FTP:**
- Host: `ftp.seudominio.com`
- Usuário: (ver no painel Hostinger)
- Senha: (ver no painel Hostinger)
- Porta: 21

**Passos:**
1. Conecte via FileZilla
2. Navegue até `public_html/`
3. DELETE tudo
4. Arraste conteúdo de `out/` para `public_html/`

---

## ✅ Checklist Pós-Deploy

- [ ] Site carrega em `https://seudominio.com`
- [ ] Login funciona
- [ ] Cadastro funciona
- [ ] Leitura carrega
- [ ] Meta Pixel dispara (verificar no Facebook)
- [ ] SSL ativo (HTTPS)
- [ ] Sem erros 404

---

## 🔧 Variáveis de Ambiente

Antes do build, configure `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
NEXT_PUBLIC_BASE_URL=https://seudominio.com
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-xxx
```

---

## 🆘 Problemas Comuns

### Site retorna 404
→ Verificar se `.htaccess` foi enviado

### CSS não carrega
→ Verificar se pasta `_next/` foi enviada

### Login não funciona
→ Verificar variáveis de ambiente no build

---

## 🔄 Atualizar Site

```bash
# 1. Fazer alterações no código
# 2. Rodar build novamente
./build-hostinger.sh  # ou .bat no Windows

# 3. Fazer upload dos arquivos atualizados
```

---

## 📞 Suporte

Dúvidas? Me chama! 🙏
