# 🌐 Configurar DNS para Resend (Hostinger + Netlify)

## 🔍 Situação Atual

Você tem:
- **Domínio registrado:** Hostinger
- **Site hospedado:** Netlify
- **Nameservers apontando para:** Netlify (provavelmente)

A Hostinger está dizendo que não pode editar os DNS porque os nameservers estão em outro lugar.

---

## ✅ Solução: Adicionar DNS no Netlify (Recomendado)

Como seu site está no Netlify e os nameservers provavelmente já apontam para lá, **adicione os registros DNS diretamente no Netlify**.

### 📋 Passo a Passo:

#### 1️⃣ Acessar DNS no Netlify

1. Acesse: https://app.netlify.com/
2. Vá no seu site
3. Vá em **"Domain settings"** (ou "Domain management")
4. Role até **"DNS records"** ou **"DNS settings"**

#### 2️⃣ Adicionar Registro TXT do Resend

Clique em **"Add new record"** e adicione:

```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDkpR/QQX/6hl2Kc0wklWJphQq9gHR2+bINw+ZVmddg43y00bwuTKaVlBvfsVdNODaMG5Ub014LUIK1xskHB0zZHCEbbC5ndkq8aKmvxdFez6U/474Lnf39cidqd5C2QQI17nkD9NTNVj59sx1Zfea/xKif5Kgl8PKYESmXgTj0QIDAQAB
TTL: Auto (ou 3600)
```

**IMPORTANTE:** 
- O campo **Name** deve ser exatamente: `resend._domainkey`
- O campo **Value** é o que o Resend te deu (começa com `p=MIG...`)

#### 3️⃣ Salvar

Clique em **"Save"** ou **"Add record"**

#### 4️⃣ Aguardar Propagação

- Pode levar de **alguns minutos até 48 horas**
- Geralmente funciona em **15-30 minutos**

#### 5️⃣ Verificar no Resend

1. Volte para: https://resend.com/domains
2. Clique em **"Verify"** no seu domínio
3. Se aparecer ✅ verde, está funcionando!

---

## 🔄 Alternativa: Mudar Nameservers para Hostinger

Se você quiser gerenciar tudo na Hostinger (não recomendado se o site está no Netlify):

### ⚠️ Atenção: Isso vai afetar seu site!

Se você mudar os nameservers de volta para Hostinger, **seu site no Netlify vai parar de funcionar** até você reconfigurar tudo.

### Passos (NÃO RECOMENDADO):

1. Descubra os nameservers da Hostinger
2. Mude os nameservers do domínio
3. Configure DNS na Hostinger
4. Reconfigure o domínio no Netlify

**Isso é muito mais complicado e pode derrubar seu site!**

---

## 🎯 Recomendação: Use o Netlify DNS

**Por quê?**
- ✅ Mais simples
- ✅ Tudo em um lugar
- ✅ Não afeta o site
- ✅ Mais rápido

**Como fazer:**
1. Adicione o registro TXT no Netlify (passo a passo acima)
2. Aguarde propagação
3. Verifique no Resend

---

## 📝 Onde Adicionar o DNS

### Se os nameservers estão no Netlify:
✅ **Adicione no Netlify** (recomendado)

### Se os nameservers estão na Hostinger:
✅ **Adicione na Hostinger**

### Como saber onde estão os nameservers?

1. Acesse: https://www.whatsmydns.net/
2. Digite seu domínio
3. Selecione tipo: **NS** (Nameserver)
4. Clique em "Search"

**Se aparecer algo como:**
- `dns1.p01.nsone.net` → Netlify
- `ns1.hostinger.com` → Hostinger

---

## 🔍 Verificar Nameservers Atuais

### Opção 1: Online
1. Acesse: https://www.whatsmydns.net/
2. Digite seu domínio
3. Tipo: NS
4. Veja onde está apontando

### Opção 2: Netlify
1. Vá em: https://app.netlify.com/
2. Seu site → "Domain settings"
3. Veja se tem "Netlify DNS" ativo

### Opção 3: Hostinger
1. Acesse o painel da Hostinger
2. Vá em "Domínios"
3. Clique no seu domínio
4. Veja "Servidores de Nomes"

---

## 📋 Guia Visual - Adicionar DNS no Netlify

### Passo 1: Acessar DNS Settings
```
Netlify Dashboard
  → Seu Site
    → Domain settings
      → DNS records
        → Add new record
```

### Passo 2: Preencher Formulário
```
┌─────────────────────────────────────┐
│ Add DNS Record                      │
├─────────────────────────────────────┤
│ Type: [TXT ▼]                       │
│                                     │
│ Name: resend._domainkey             │
│                                     │
│ Value: p=MIGfMA0GCSqGSIb3DQEBA...   │
│                                     │
│ TTL: [Auto ▼]                       │
│                                     │
│        [Cancel]  [Add record]       │
└─────────────────────────────────────┘
```

### Passo 3: Verificar
```
Resend Dashboard
  → Domains
    → Seu domínio
      → [Verify] ← Clique aqui
```

---

## ⏱️ Tempo de Propagação

| Ação | Tempo |
|------|-------|
| Adicionar registro | Imediato |
| Propagação DNS | 15 min - 48h |
| Verificação Resend | Após propagação |

**Dica:** Teste a cada 15 minutos

---

## 🧪 Testar se Funcionou

### Método 1: Resend Dashboard
1. Acesse: https://resend.com/domains
2. Clique em "Verify"
3. Se aparecer ✅ verde, funcionou!

### Método 2: Ferramenta Online
1. Acesse: https://mxtoolbox.com/SuperTool.aspx
2. Digite: `resend._domainkey.seudominio.com`
3. Selecione: TXT Lookup
4. Clique em "TXT Lookup"
5. Deve aparecer o valor que você adicionou

### Método 3: Linha de Comando
```bash
nslookup -type=TXT resend._domainkey.seudominio.com
```

Deve retornar o valor começando com `p=MIG...`

---

## 🐛 Problemas Comuns

### "Não consigo adicionar DNS no Netlify"

**Possível causa:** Domínio não está configurado no Netlify

**Solução:**
1. Vá em "Domain settings"
2. Clique em "Add custom domain"
3. Digite seu domínio
4. Siga as instruções

### "Registro não propaga"

**Possível causa:** Cache DNS

**Solução:**
1. Aguarde mais tempo (até 48h)
2. Limpe cache DNS do seu computador:
   - Windows: `ipconfig /flushdns`
   - Mac: `sudo dscacheutil -flushcache`
3. Teste em outro dispositivo/rede

### "Hostinger não deixa editar DNS"

**Causa:** Nameservers não estão na Hostinger

**Solução:** Adicione no Netlify (onde os nameservers estão)

---

## ✅ Checklist

- [ ] Descobri onde estão os nameservers (Netlify ou Hostinger)
- [ ] Acessei o painel correto (Netlify ou Hostinger)
- [ ] Adicionei registro TXT: `resend._domainkey`
- [ ] Colei o valor correto (começa com `p=MIG...`)
- [ ] Salvei o registro
- [ ] Aguardei propagação (15 min - 48h)
- [ ] Verifiquei no Resend
- [ ] Apareceu ✅ verde no Resend

---

## 🎯 Resumo

**Situação:** Hostinger não deixa editar DNS porque nameservers estão no Netlify

**Solução:** Adicione o registro DNS diretamente no Netlify

**Onde:** Netlify Dashboard → Domain settings → DNS records → Add new record

**O que adicionar:**
- Type: TXT
- Name: `resend._domainkey`
- Value: (o valor que o Resend te deu)

**Tempo:** 15 minutos a 48 horas para propagar

**Verificar:** https://resend.com/domains → Verify

---

## 📞 Precisa de Ajuda?

Se ainda tiver dúvidas:
1. Me mande um print da tela da Hostinger
2. Me mande um print da tela do Netlify
3. Me diga qual é seu domínio

Vou te ajudar a configurar! 😊
