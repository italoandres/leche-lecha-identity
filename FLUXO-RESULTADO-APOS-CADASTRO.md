# Mudança de Fluxo: Resultado Após Cadastro

## Objetivo

Aumentar conversão de cadastros usando o resultado do teste como "recompensa" e capturar leads antes de mostrar o resultado.

## Fluxo Anterior

1. Usuário faz teste → vê resultado imediatamente
2. Resultado tem botão "Criar conta"
3. Cadastro → Checkout → Pagamento

**Problema**: Muita gente via o resultado e saía sem cadastrar.

## Fluxo Novo

1. **Teste** (`/teste`) → Usuário responde 20 perguntas
2. **Respostas salvas** → localStorage guarda score e respostas
3. **Cadastro obrigatório** (`/cadastro`) → "Crie sua conta para ver o resultado"
4. **Resultado como recompensa** (`/resultado`) → Mostra análise completa
5. **Checkout** (`/checkout`) → Venda do eBook $7.50
6. **Pagamento** → Hotmart
7. **Boas-vindas** (`/bem-vindo`) → Acesso ao eBook
8. **Leitura** (`/leitura/capitulos`) → 8 capítulos
9. **App** → Liberado após completar leitura

## Vantagens

✅ **Maior conversão de cadastro**: Pessoa já investiu tempo no teste, quer ver o resultado
✅ **Captura lead antes**: Mesmo que não compre, você tem o email
✅ **Pixel CompleteRegistration mais valioso**: Só dispara para quem realmente se cadastrou
✅ **Resultado vira "recompensa"**: Aumenta percepção de valor
✅ **Mais dados**: Você sabe quem fez o teste mesmo sem comprar

## Mudanças Técnicas

### 1. Página `/teste` (app/teste/page.tsx)

**Antes:**
```typescript
// Redirecionava direto para /resultado com score na URL
router.push(`/resultado?score=${result.total}`);
```

**Agora:**
```typescript
// Salva no localStorage e redireciona para cadastro
localStorage.setItem('testResponses', JSON.stringify(validResponses));
localStorage.setItem('testScore', result.total.toString());
router.push('/cadastro');
```

### 2. Página `/cadastro` (app/cadastro/page.tsx)

**Antes:**
- Título: "Antes de começar, crie seu acesso pessoal"
- Redirecionava para: `/teste`

**Agora:**
- Título: "Crie sua conta para ver o resultado"
- Texto: "Você já respondeu o teste. Agora crie sua conta para acessar o resultado completo."
- Botão: "Criar conta e ver resultado"
- Redirecionava para: `/resultado`

### 3. Página `/resultado` (app/resultado/page.tsx)

**Antes:**
```typescript
// Buscava score apenas da URL
const score = scoreParam ? parseInt(scoreParam, 10) : null;
```

**Agora:**
```typescript
// Busca score da URL OU do localStorage
useEffect(() => {
  if (scoreParam) {
    setScore(parseInt(scoreParam, 10));
  } else {
    const savedScore = localStorage.getItem('testScore');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }
}, [scoreParam]);
```

## Dados Salvos no localStorage

```typescript
{
  testResponses: number[],  // Array com as 20 respostas (0-4)
  testScore: string          // Score total (0-80)
}
```

## Pixel do Facebook

O evento `CompleteRegistration` continua disparando no cadastro, mas agora tem mais valor porque:
- Só dispara para quem realmente completou o teste
- Pessoa está mais engajada (já investiu tempo)
- Lead mais qualificado

## Fluxo de Dados

```
┌─────────┐
│  Teste  │ → Salva respostas no localStorage
└────┬────┘
     │
     ▼
┌──────────┐
│ Cadastro │ → Cria conta no Supabase + Dispara Pixel
└────┬─────┘
     │
     ▼
┌───────────┐
│ Resultado │ → Busca score do localStorage
└────┬──────┘
     │
     ▼
┌──────────┐
│ Checkout │ → Venda do eBook
└──────────┘
```

## Compatibilidade

✅ **Funciona com URL direta**: Se alguém acessar `/resultado?score=65`, ainda funciona
✅ **Funciona com localStorage**: Se vier do fluxo novo, busca do localStorage
✅ **Não quebra fluxo antigo**: Links antigos continuam funcionando

## Teste Manual

Para testar o novo fluxo:

1. Acesse `/teste`
2. Responda todas as 20 perguntas
3. Será redirecionado para `/cadastro`
4. Crie uma conta
5. Será redirecionado para `/resultado` com seu score
6. Veja o resultado completo + oferta do eBook

## Arquivos Modificados

- `app/teste/page.tsx` - Salva no localStorage e redireciona para cadastro
- `app/cadastro/page.tsx` - Texto atualizado + redireciona para resultado
- `app/resultado/page.tsx` - Busca score do localStorage

## Próximos Passos

Após testar localmente e confirmar que está funcionando:
1. Fazer commit
2. Push para GitHub
3. Deploy automático no Netlify
4. Testar em produção
