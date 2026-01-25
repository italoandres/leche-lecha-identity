# Implementation Plan: Narcisismo Materno Diagnóstico

## Overview

Este plano implementa uma aplicação web terapêutica usando Next.js 14, TypeScript, Tailwind CSS e Framer Motion. A implementação seguirá uma abordagem incremental, construindo primeiro a estrutura base, depois o questionário, cálculo de pontuação, integração com IA, e finalmente testes e refinamentos.

## Tasks

- [x] 1. Setup inicial do projeto e configuração
  - Criar projeto Next.js 14 com TypeScript e App Router
  - Configurar Tailwind CSS com tema terapêutico (cores escuras, tipografia limpa)
  - Instalar e configurar Framer Motion para animações
  - Configurar estrutura de pastas (app/, components/, lib/)
  - Criar arquivo .env.local com variáveis de ambiente
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 2. Implementar módulo de perguntas e pontuação
  - [x] 2.1 Criar arquivo lib/questions.ts com as 20 perguntas
    - Definir interface Question com id e text
    - Criar array com 20 perguntas sobre padrões de maternidade narcísica
    - _Requirements: 3.1_

  - [x] 2.2 Escrever teste de propriedade para contagem de perguntas
    - **Property 3: Question Count Invariant**
    - **Validates: Requirements 3.1**

  - [x] 2.3 Criar arquivo lib/scoring.ts com lógica de cálculo
    - Implementar função calculateScore(responses: number[]): Score
    - Implementar função determineFaixa(score: number): string
    - Garantir validação de range (0-80)
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 2.4 Escrever testes de propriedade para scoring
    - **Property 1: Score Calculation Correctness**
    - **Property 2: Faixa Classification Correctness**
    - **Validates: Requirements 3.6, 4.1, 4.2, 4.3**

  - [x] 2.5 Escrever testes unitários para edge cases de scoring
    - Testar score mínimo (0) e máximo (80)
    - Testar boundaries entre faixas (20, 21, 40, 41, 60, 61)
    - _Requirements: 4.1, 4.2, 4.3_

- [x] 3. Criar componentes base reutilizáveis
  - [x] 3.1 Implementar componente ProgressBar
    - Criar components/ProgressBar.tsx com props current e total
    - Aplicar animação suave na transição de progresso
    - Estilizar com Tailwind (barra escura com preenchimento accent)
    - _Requirements: 3.4, 10.2_

  - [x] 3.2 Escrever teste de propriedade para cálculo de progresso
    - **Property 5: Progress Calculation Accuracy**
    - **Validates: Requirements 3.4**

  - [x] 3.3 Implementar componente QuestionCard
    - Criar components/QuestionCard.tsx com escala 0-4
    - Implementar 5 opções de resposta (radio buttons estilizados)
    - Adicionar animação fade ao trocar de pergunta
    - _Requirements: 3.2, 3.3, 10.1_

  - [x] 3.4 Escrever teste de propriedade para escala de resposta
    - **Property 4: Response Scale Consistency**
    - **Validates: Requirements 3.3**

  - [x] 3.5 Implementar componente ResultCard
    - Criar components/ResultCard.tsx para exibir score e interpretação
    - Incluir seção para perguntas reflexivas
    - Aplicar animações fade-in suaves
    - _Requirements: 5.1, 5.3, 5.5_

  - [x] 3.6 Implementar componente CTAButton
    - Criar components/CTAButton.tsx com variantes primary/secondary
    - Aplicar hover effects suaves
    - Garantir touch target mínimo de 44x44px
    - _Requirements: 5.6, 11.3, 12.4_

- [x] 4. Checkpoint - Verificar componentes base
  - Garantir que todos os componentes renderizam corretamente
  - Verificar que animações estão dentro do range 300-600ms
  - Perguntar ao usuário se há dúvidas ou ajustes necessários

- [x] 5. Implementar página inicial (Landing)
  - [x] 5.1 Criar app/page.tsx com conteúdo introdutório
    - Adicionar título claro explicando o propósito do teste
    - Incluir instruções sobre sinceridade e confidencialidade
    - Adicionar botão "Começar" com link para /teste
    - Aplicar tema terapêutico (fundo escuro, tipografia limpa)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 9.5_

  - [x] 5.2 Escrever testes unitários para landing page
    - Verificar presença de título, instruções e botão
    - Verificar que botão navega para /teste
    - _Requirements: 2.1, 2.2, 2.3_

- [x] 6. Implementar página do questionário
  - [x] 6.1 Criar app/teste/page.tsx com estado do questionário
    - Implementar estado: currentQuestionIndex, responses[], isComplete
    - Renderizar ProgressBar e QuestionCard
    - Implementar navegação Previous/Next
    - Garantir que apenas uma pergunta é exibida por vez
    - _Requirements: 3.2, 3.4, 3.5, 3.7_

  - [x] 6.2 Escrever teste de propriedade para navegação bidirecional
    - **Property 6: Navigation Bidirectionality**
    - **Validates: Requirements 3.5**

  - [x] 6.3 Escrever teste de propriedade para persistência de respostas
    - **Property 7: Response Persistence**
    - **Validates: Requirements 3.7**

  - [x] 6.4 Implementar cálculo automático ao completar
    - Quando todas as 20 perguntas forem respondidas, calcular score
    - Navegar para /resultado?score={score}
    - _Requirements: 3.6, 4.4_

  - [x] 6.5 Escrever testes de integração para fluxo do questionário
    - Testar navegação completa de 20 perguntas
    - Testar que score é calculado corretamente ao final
    - _Requirements: 3.1, 3.6, 4.1_

- [x] 7. Checkpoint - Verificar fluxo do questionário
  - Testar manualmente o fluxo completo de perguntas
  - Verificar que progresso atualiza corretamente
  - Verificar que navegação funciona em ambas direções
  - Perguntar ao usuário se há ajustes necessários

- [x] 8. Implementar módulo de prompt da IA
  - [x] 8.1 Criar lib/aiPrompt.ts com prompt fechado
    - Implementar função buildPrompt(score, faixa): PromptConfig
    - Incluir todas as restrições (não diagnosticar, não usar termos médicos, etc)
    - Especificar formato de resposta JSON esperado
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 8.2 Escrever testes unitários para conteúdo do prompt
    - Verificar que prompt contém proibições explícitas
    - Verificar que prompt menciona as 4 faixas
    - Verificar que prompt solicita 2 perguntas reflexivas
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 9. Implementar API route para diagnóstico
  - [x] 9.1 Criar app/api/diagnostico/route.ts
    - Implementar handler POST que recebe { score: number }
    - Validar que score está entre 0-80
    - Determinar faixa usando determineFaixa()
    - Construir prompt usando buildPrompt()
    - _Requirements: 7.1, 7.2_

  - [x] 9.2 Escrever teste de propriedade para estrutura da requisição API
    - **Property 8: API Request Structure Completeness**
    - **Validates: Requirements 7.2**

  - [x] 9.3 Integrar com OpenAI API
    - Usar variável de ambiente OPENAI_API_KEY
    - Implementar timeout de 30 segundos
    - Fazer chamada para OpenAI com prompt construído
    - _Requirements: 7.3, 7.5_

  - [x] 9.4 Implementar tratamento de erros e fallback
    - Capturar erros de timeout, rede e API
    - Retornar mensagem fallback baseada na faixa
    - Logar erros para monitoramento
    - _Requirements: 7.4_

  - [x] 9.5 Parsear e validar resposta da IA
    - Extrair interpretation e reflectiveQuestions do JSON
    - Sanitizar resposta para remover HTML/JS perigoso
    - Validar que existem exatamente 2 perguntas reflexivas
    - _Requirements: 7.6, 5.5_

  - [x] 9.6 Escrever teste de propriedade para validação de resposta da IA
    - **Property 9: IA Response Structure Validation**
    - **Property 15: Input Sanitization**
    - **Validates: Requirements 5.5, 7.6**

  - [x] 9.7 Escrever testes unitários para API route
    - Testar validação de score inválido
    - Testar timeout da IA
    - Testar fallback em caso de erro
    - _Requirements: 7.1, 7.4, 7.5_

- [x] 10. Checkpoint - Verificar integração com IA
  - Garantir que todos os testes passam
  - Testar API route manualmente com diferentes scores
  - Verificar que fallbacks funcionam quando IA falha
  - Verificar que respostas são sanitizadas
  - Perguntar ao usuário se há ajustes necessários

- [x] 11. Implementar página de resultado
  - [x] 11.1 Criar app/resultado/page.tsx
    - Extrair score do searchParams
    - Fazer chamada para /api/diagnostico com score
    - Implementar estado de loading com animação
    - Renderizar ResultCard com interpretação da IA
    - Exibir 2 perguntas reflexivas
    - Incluir CTAButton para e-book
    - _Requirements: 5.1, 5.2, 5.3, 5.5, 5.6, 11.2, 11.3, 11.4_

  - [x] 11.2 Escrever teste de propriedade para privacidade de dados
    - **Property 10: Client-Side Privacy Preservation**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4**

  - [x] 11.3 Escrever testes de integração para página de resultado
    - Testar que score é exibido corretamente
    - Testar que loading state aparece durante chamada API
    - Testar que interpretação é renderizada após resposta
    - _Requirements: 5.1, 5.2, 5.3_

- [x] 12. Implementar testes de acessibilidade
  - [x] 12.1 Escrever teste de propriedade para contrast ratio
    - **Property 12: Contrast Ratio Accessibility**
    - **Validates: Requirements 1.5**

  - [x] 12.2 Escrever teste de propriedade para touch targets
    - **Property 14: Touch Target Accessibility**
    - **Validates: Requirements 12.4**

  - [x] 12.3 Executar testes com jest-axe em todas as páginas
    - Testar landing page
    - Testar página de teste
    - Testar página de resultado
    - _Requirements: 1.5, 12.4_

- [x] 13. Implementar testes de responsividade e animações
  - [x] 13.1 Escrever teste de propriedade para duração de animações
    - **Property 11: Animation Duration Constraint**
    - **Validates: Requirements 1.3, 10.5**

  - [x] 13.2 Escrever teste de propriedade para layout responsivo
    - **Property 13: Responsive Layout Integrity**
    - **Validates: Requirements 12.1**

  - [x] 13.3 Testar responsividade em múltiplos viewports
    - Testar em 320px (mobile pequeno)
    - Testar em 768px (tablet)
    - Testar em 1920px (desktop)
    - _Requirements: 12.1_

- [x] 14. Refinamentos finais e otimizações
  - [x] 14.1 Otimizar performance
    - Comprimir imagens e assets
    - Implementar lazy loading onde apropriado
    - Verificar bundle size
    - _Requirements: 12.2_

  - [x] 14.2 Configurar headers de segurança
    - Adicionar security headers no next.config.js
    - Configurar CSP (Content Security Policy)
    - _Requirements: 7.3_

  - [x] 14.3 Adicionar metadata e SEO
    - Configurar metadata no layout.tsx
    - Adicionar Open Graph tags
    - Adicionar favicon e manifest

  - [x] 14.4 Executar Lighthouse e verificar performance
    - Garantir score ≥ 80
    - Verificar Core Web Vitals
    - _Requirements: 12.3, 12.5_

- [x] 15. Checkpoint final - Revisão completa
  - Executar todos os testes (unit + property + integration)
  - Testar fluxo completo end-to-end manualmente
  - Verificar que todas as propriedades de corretude passam
  - Verificar acessibilidade e responsividade
  - Perguntar ao usuário se está pronto para deploy

## Notes

- Todas as tarefas são obrigatórias para garantir implementação completa e robusta
- Cada tarefa referencia requisitos específicos para rastreabilidade
- Checkpoints garantem validação incremental
- Testes de propriedade validam corretude universal
- Testes unitários validam exemplos específicos e edge cases
- A implementação segue uma abordagem incremental: estrutura → lógica → UI → integração → testes → refinamentos
