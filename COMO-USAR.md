# 🚀 Como Usar Este Projeto

## Passo 1: Configurar a Chave da OpenAI

Antes de executar o projeto, você precisa de uma chave da API da OpenAI.

### Como obter a chave:

1. Acesse: https://platform.openai.com/api-keys
2. Faça login (ou crie uma conta se não tiver)
3. Clique em **"Create new secret key"**
4. Dê um nome para a chave (ex: "narcisismo-materno")
5. Copie a chave (ela começa com `sk-...`)

### Configurar no projeto:

1. Abra o arquivo `.env.local` na raiz do projeto
2. Substitua `sua-chave-aqui` pela chave que você copiou:

```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Salve o arquivo

## Passo 2: Executar o Projeto

Abra o terminal nesta pasta e execute:

```bash
npm run dev
```

Aguarde alguns segundos até ver a mensagem:

```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

## Passo 3: Acessar o Site

Abra seu navegador e acesse:

```
http://localhost:3000
```

## 🎯 Testando o Fluxo Completo

1. **Página Inicial**: Você verá a introdução do teste
2. **Clique em "Começar o Teste"**
3. **Responda as 20 perguntas**: Use a escala de 0 a 4
4. **Veja seu resultado**: A IA vai gerar uma interpretação personalizada

## ⚠️ Problemas Comuns

### "Erro ao buscar diagnóstico"

- Verifique se sua chave da OpenAI está correta no `.env.local`
- Verifique se você tem créditos na sua conta OpenAI
- Reinicie o servidor (`Ctrl+C` e depois `npm run dev` novamente)

### "Cannot find module"

Execute:
```bash
npm install
```

### Porta 3000 já está em uso

Execute em outra porta:
```bash
npm run dev -- -p 3001
```

Depois acesse: http://localhost:3001

## 📝 Personalizações

### Mudar o link do e-book

Edite o arquivo `app/resultado/page.tsx` e procure por:

```tsx
<CTAButton 
  text="Aprofundar Meu Entendimento" 
  href="#ebook"  // ← Mude este link
  variant="primary" 
/>
```

### Mudar as cores

Edite o arquivo `tailwind.config.ts`:

```typescript
colors: {
  background: "#1a1f2e",  // Cor de fundo
  foreground: "#e8eaed",  // Cor do texto
  primary: "#4a90e2",     // Cor primária
  accent: "#5dade2",      // Cor de destaque
  // ...
}
```

### Mudar as perguntas

Edite o arquivo `lib/questions.ts`

## 🚀 Fazer Deploy (Colocar Online)

### Opção 1: Vercel (Mais Fácil)

1. Crie uma conta em https://vercel.com
2. Clique em "Add New Project"
3. Importe este projeto
4. Adicione a variável de ambiente:
   - Nome: `OPENAI_API_KEY`
   - Valor: sua chave da OpenAI
5. Clique em "Deploy"

Pronto! Seu site estará online em alguns minutos.

### Opção 2: Netlify

1. Crie uma conta em https://netlify.com
2. Arraste a pasta do projeto
3. Configure a variável `OPENAI_API_KEY`
4. Deploy!

## 💡 Dicas

- **Teste localmente primeiro** antes de fazer deploy
- **Monitore o uso da API** da OpenAI para controlar custos
- **Personalize o conteúdo** para seu público
- **Adicione Google Analytics** se quiser acompanhar visitantes

## 📞 Precisa de Ajuda?

Se algo não funcionar:

1. Verifique se o Node.js está instalado: `node --version`
2. Verifique se as dependências foram instaladas: `npm install`
3. Verifique se a chave da OpenAI está correta
4. Reinicie o servidor

---

**Boa sorte com seu projeto!** 🎉
