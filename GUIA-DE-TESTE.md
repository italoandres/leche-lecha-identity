# 🧪 Guia de Teste Completo

## ✅ BUG CORRIGIDO!

**Problema:** Score 0 era considerado inválido
**Causa:** Validação `!score` retorna `true` quando score é 0
**Solução:** Mudado para `score === null`

---

## 🎯 Como Testar Cada Cenário

### 1️⃣ Teste de Pontuação BAIXA (0-55)

**Objetivo:** Ver o pitch leve

**Como fazer:**
1. Inicie o teste
2. Responda **TODAS** as 20 perguntas com **"Nunca" (0)** ou **"Raramente" (1)**
3. Aguarde o cálculo automático
4. Você será redirecionado para a página de resultado

**O que você deve ver:**

```
Score: 0-55/80
Faixa: Poucos Indícios ou Sinais Moderados

Pitch:
"Nem todo impacto é visível.
Alguns se tornam parte de quem somos."

Botão: "Quero entender isso melhor"
```

---

### 2️⃣ Teste de Pontuação MÉDIA (41-55)

**Objetivo:** Ver o pitch leve (ainda <56)

**Como fazer:**
1. Inicie o teste
2. Responda com **"Às vezes" (2)** na maioria das perguntas
3. Pontuação ficará entre 40-55

**O que você deve ver:**

```
Score: 40-55/80
Faixa: Sinais Moderados ou Forte Padrão

Pitch:
"Nem todo impacto é visível.
Alguns se tornam parte de quem somos."

Botão: "Quero entender isso melhor"
```

---

### 3️⃣ Teste de Pontuação ALTA (56-80)

**Objetivo:** Ver o pitch direto

**Como fazer:**
1. Inicie o teste
2. Responda **TODAS** as 20 perguntas com **"Frequentemente" (3)** ou **"Sempre" (4)**
3. Pontuação ficará entre 60-80

**O que você deve ver:**

```
Score: 60-80/80
Faixa: Forte Padrão ou Padrão Intenso

Pitch:
"Isso não foi apenas difícil.
Isso moldou quem você precisou se tornar."

Botão: "Quero aprofundar meu entendimento"
```

---

### 4️⃣ Teste do LIMITE (Score = 56)

**Objetivo:** Verificar a transição exata

**Como fazer:**
1. Responda 14 perguntas com "Sempre" (4) = 56 pontos
2. Responda 6 perguntas com "Nunca" (0) = 0 pontos
3. Total: 56 pontos (exatamente no limite)

**O que você deve ver:**

```
Score: 56/80

Pitch:
"Isso não foi apenas difícil..." (PITCH DIRETO)
```

---

### 5️⃣ Teste do LIMITE (Score = 55)

**Objetivo:** Verificar que 55 ainda é pitch leve

**Como fazer:**
1. Responda 13 perguntas com "Sempre" (4) = 52 pontos
2. Responda 1 pergunta com "Frequentemente" (3) = 3 pontos
3. Responda 6 perguntas com "Nunca" (0) = 0 pontos
4. Total: 55 pontos

**O que você deve ver:**

```
Score: 55/80

Pitch:
"Nem todo impacto é visível..." (PITCH LEVE)
```

---

## 🔍 Checklist de Validação

### Funcionalidades Básicas
- [ ] Página inicial carrega sem erros
- [ ] Botão "Começar o Teste" funciona
- [ ] Perguntas aparecem uma por vez
- [ ] Barra de progresso atualiza corretamente
- [ ] Botões "Anterior" e "Próxima" funcionam
- [ ] Não é possível voltar antes da primeira pergunta
- [ ] Não é possível avançar depois da última pergunta

### Cálculo e Navegação
- [ ] Ao responder todas as 20 perguntas, redireciona automaticamente
- [ ] Score é calculado corretamente
- [ ] Score 0 funciona (não dá erro)
- [ ] Score 80 funciona
- [ ] URL contém o score correto (?score=X)

### Página de Resultado
- [ ] Score é exibido corretamente
- [ ] Faixa é exibida corretamente
- [ ] Interpretação da IA aparece
- [ ] 2 perguntas reflexivas aparecem (sempre as mesmas)
- [ ] Pitch correto aparece baseado no score

### Pitches por Faixa
- [ ] Score 0-55: Pitch leve ("Nem todo impacto...")
- [ ] Score 56-80: Pitch direto ("Isso não foi apenas...")
- [ ] Botões têm textos diferentes por faixa
- [ ] Headlines são diferentes por faixa

### Integração com IA
- [ ] IA menciona a pontuação explicitamente
- [ ] Interpretação é personalizada
- [ ] Perguntas reflexivas são sempre as mesmas 2
- [ ] IA não cria CTAs ou ofertas
- [ ] Fallback funciona se IA falhar

### Responsividade
- [ ] Funciona em mobile (320px)
- [ ] Funciona em tablet (768px)
- [ ] Funciona em desktop (1920px)
- [ ] Botões têm tamanho mínimo de 44x44px

### Animações
- [ ] Fade-in suave ao carregar páginas
- [ ] Transições entre perguntas são suaves
- [ ] Barra de progresso anima suavemente
- [ ] Animações não excedem 600ms

---

## 🐛 Problemas Comuns e Soluções

### "Score inválido"
✅ **CORRIGIDO!** Agora score 0 funciona corretamente.

### "Erro ao buscar diagnóstico"
- Verifique se a chave da OpenAI está no `.env.local`
- Verifique se você tem créditos na OpenAI
- Reinicie o servidor: `Ctrl+C` e `npm run dev`

### IA não responde
- Verifique a chave da API
- Verifique sua conexão com internet
- O fallback deve aparecer automaticamente após 30s

### Página em branco
- Abra o console do navegador (F12)
- Veja se há erros em vermelho
- Reinicie o servidor

---

## 📊 Tabela de Scores para Teste Rápido

| Resposta | Valor | 20x = Score | Pitch |
|----------|-------|-------------|-------|
| Nunca | 0 | 0 | Leve |
| Raramente | 1 | 20 | Leve |
| Às vezes | 2 | 40 | Leve |
| Às vezes + 1 Freq | 2+3 | 43 | Leve |
| 14x Sempre | 4 | 56 | **Direto** |
| Frequentemente | 3 | 60 | Direto |
| Sempre | 4 | 80 | Direto |

---

## 🚀 Teste Rápido (5 minutos)

1. **Teste Score 0:**
   - Responda tudo "Nunca"
   - Confirme: Pitch leve aparece

2. **Teste Score 80:**
   - Refaça o teste
   - Responda tudo "Sempre"
   - Confirme: Pitch direto aparece

3. **Teste Navegação:**
   - Clique "Anterior" e "Próxima"
   - Confirme: Respostas são mantidas

4. **Teste IA:**
   - Veja se a interpretação menciona o score
   - Veja se as 2 perguntas aparecem

**Se tudo funcionar, está pronto para deploy! ✅**

---

## 💡 Dicas de Teste

- Use o modo anônimo do navegador para testar do zero
- Limpe o cache se algo parecer estranho
- Teste em diferentes navegadores (Chrome, Firefox, Safari)
- Teste em mobile real, não só no DevTools
- Anote qualquer comportamento estranho

---

**Boa sorte com os testes! 🎉**
