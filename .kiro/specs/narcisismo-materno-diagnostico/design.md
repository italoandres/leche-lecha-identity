# Design Document: Narcisismo Materno Diagnóstico

## Overview

Este sistema é uma aplicação web terapêutica construída com Next.js 14, TypeScript e Tailwind CSS. O objetivo é fornecer um teste interativo de 20 perguntas sobre padrões de maternidade narcísica, calcular uma pontuação (0-80), e gerar uma interpretação personalizada usando IA controlada por prompt restritivo. A experiência do usuário é projetada para ser introvertida, empática e não-clínica, com foco em validação emocional e conversão natural para material educativo.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Next.js App Router (React Server Components)          │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ │ │
│  │  │  Landing │  │  Teste   │  │     Resultado        │ │ │
│  │  │   Page   │→ │   Page   │→ │  Page + IA Response  │ │ │
│  │  └──────────┘  └──────────┘  └──────────────────────┘ │ │
│  │                                         ↓                │ │
│  │                                  ┌──────────────┐       │ │
│  │                                  │ Client State │       │ │
│  │                                  │  (Respostas) │       │ │
│  │                                  └──────────────┘       │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP POST
┌─────────────────────────────────────────────────────────────┐
│                    Next.js API Routes                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  /api/diagnostico/route.ts                             │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │ │
│  │  │   Validate   │→ │   Build      │→ │   Call IA   │  │ │
│  │  │    Score     │  │   Prompt     │  │   Service   │  │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                   External IA Service                        │
│                    (OpenAI GPT / Similar)                    │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **IA Integration**: OpenAI API (ou similar)
- **State Management**: React useState/useReducer (client-side only)
- **Deployment**: Vercel (recomendado) ou similar

### Design Principles

1. **Separation of Concerns**: UI, business logic, and data access are separated
2. **Client-Side Privacy**: User responses stored only in browser state
3. **Controlled IA**: Strict prompt engineering prevents inappropriate responses
4. **Progressive Enhancement**: Core functionality works without JavaScript
5. **Therapeutic UX**: Every interaction designed for emotional safety

## Components and Interfaces

### Page Components

#### 1. Landing Page (`app/page.tsx`)

**Purpose**: Introduce the test and build trust

**Props**: None (static content)

**State**: None

**Key Elements**:
- Hero section with calming title
- Instructions emphasizing safety and confidentiality
- Start button with smooth hover animation
- Dark therapeutic background

**Behavior**:
- On "Start" click → Navigate to `/teste`

---

#### 2. Teste Page (`app/teste/page.tsx`)

**Purpose**: Present questionnaire and collect responses

**State**:
```typescript
interface TesteState {
  currentQuestionIndex: number;
  responses: number[]; // Array of 20 numbers (0-4)
  isComplete: boolean;
}
```

**Key Elements**:
- `<ProgressBar />` component
- `<QuestionCard />` component
- Navigation buttons (Previous/Next)

**Behavior**:
- Display one question at a time
- Update progress bar on each answer
- Allow navigation back to previous questions
- On completion → Calculate score → Navigate to `/resultado?score={score}`

---

#### 3. Resultado Page (`app/resultado/page.tsx`)

**Purpose**: Display score, faixa, and IA interpretation

**Props**:
```typescript
interface ResultadoProps {
  searchParams: {
    score: string; // URL parameter
  };
}
```

**State**:
```typescript
interface ResultadoState {
  iaResponse: string | null;
  isLoading: boolean;
  error: string | null;
}
```

**Key Elements**:
- Score display with faixa classification
- Loading state while IA processes
- `<ResultCard />` with IA interpretation
- Reflective questions from IA
- `<CTAButton />` for e-book conversion

**Behavior**:
- On mount → Extract score from URL
- Call `/api/diagnostico` with score
- Display loading animation
- Render IA response with fade-in animation
- Show CTA after interpretation

---

### Reusable Components

#### 4. ProgressBar Component

```typescript
interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  // Render animated progress bar
}
```

**Styling**: Dark background, accent color fill, smooth width transition

---

#### 5. QuestionCard Component

```typescript
interface QuestionCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  currentValue: number | null;
  onAnswer: (value: number) => void;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  currentValue,
  onAnswer
}: QuestionCardProps) {
  // Render question with 5-point scale (0-4)
}
```

**Styling**: Card with soft shadow, large readable text, radio buttons styled as therapeutic scale

---

#### 6. ResultCard Component

```typescript
interface ResultCardProps {
  score: number;
  faixa: string;
  interpretation: string;
  reflectiveQuestions: string[];
}

export function ResultCard({
  score,
  faixa,
  interpretation,
  reflectiveQuestions
}: ResultCardProps) {
  // Render result with IA interpretation
}
```

**Styling**: Larger card, empathetic typography, soft animations

---

#### 7. CTAButton Component

```typescript
interface CTAButtonProps {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export function CTAButton({ text, href, variant = 'primary' }: CTAButtonProps) {
  // Render call-to-action button
}
```

**Styling**: Prominent but not aggressive, smooth hover effects

---

### API Routes

#### 8. Diagnostico API Route (`app/api/diagnostico/route.ts`)

**Endpoint**: `POST /api/diagnostico`

**Request Body**:
```typescript
interface DiagnosticoRequest {
  score: number; // 0-80
}
```

**Response**:
```typescript
interface DiagnosticoResponse {
  faixa: string;
  interpretation: string;
  reflectiveQuestions: string[];
}
```

**Error Response**:
```typescript
interface ErrorResponse {
  error: string;
  fallbackMessage?: string;
}
```

**Behavior**:
1. Validate score (0-80)
2. Determine faixa based on score
3. Build prompt using `buildPrompt(score, faixa)`
4. Call IA service with timeout (30s)
5. Parse IA response
6. Extract interpretation and reflective questions
7. Return structured response

---

## Data Models

### Question Model

```typescript
interface Question {
  id: number; // 1-20
  text: string;
  category?: string; // Optional grouping
}

// Example
const questions: Question[] = [
  {
    id: 1,
    text: "Sua mãe frequentemente fazia você se sentir culpado por suas escolhas?"
  },
  {
    id: 2,
    text: "Você sentia que precisava cuidar das emoções da sua mãe?"
  },
  // ... 18 more questions
];
```

**Storage**: `lib/questions.ts` (static array)

---

### Response Model

```typescript
interface UserResponse {
  questionId: number;
  value: number; // 0-4
}

// During test, stored as simple array
type ResponseArray = number[]; // [0-4, 0-4, ..., 0-4] (20 items)
```

**Storage**: Client-side React state only

---

### Score Model

```typescript
interface Score {
  total: number; // 0-80
  faixa: 'poucos-indicios' | 'sinais-moderados' | 'forte-padrao' | 'padrao-intenso';
}

function calculateScore(responses: number[]): Score {
  const total = responses.reduce((sum, val) => sum + val, 0);
  const faixa = determineFaixa(total);
  return { total, faixa };
}

function determineFaixa(score: number): Score['faixa'] {
  if (score <= 20) return 'poucos-indicios';
  if (score <= 40) return 'sinais-moderados';
  if (score <= 60) return 'forte-padrao';
  return 'padrao-intenso';
}
```

**Storage**: `lib/scoring.ts`

---

### IA Prompt Model

```typescript
interface PromptConfig {
  systemPrompt: string;
  userPrompt: string;
}

function buildPrompt(score: number, faixa: string): PromptConfig {
  const systemPrompt = `
Você é um assistente de interpretação emocional.

RESTRIÇÕES ABSOLUTAS:
- NÃO faça diagnósticos clínicos
- NÃO use termos médicos
- NÃO rotule a mãe como vilã
- NÃO prometa cura ou terapia

CONTEXTO:
O usuário completou um teste sobre padrões de maternidade narcísica.
Pontuação total: 0-80

FAIXAS:
- 0-20: poucos indícios
- 21-40: sinais moderados
- 41-60: forte padrão
- 61-80: padrão intenso de abuso emocional

SUA TAREFA:
1. Interpretar o resultado com empatia e clareza
2. Validar a dor emocional SEM estimular ódio ou confronto
3. Explicar impactos comuns na vida adulta
4. Fazer 2 perguntas reflexivas curtas
5. Convidar suavemente o usuário a aprofundar o entendimento

TOM: Calmo, respeitoso, humano, sem promessas de cura.

FORMATO DE RESPOSTA:
Retorne um JSON com esta estrutura:
{
  "interpretation": "texto da interpretação (2-3 parágrafos)",
  "reflectiveQuestions": ["pergunta 1", "pergunta 2"]
}
`;

  const userPrompt = `
Pontuação do usuário: ${score}/80
Faixa: ${faixa}

Por favor, forneça uma interpretação empática e 2 perguntas reflexivas.
`;

  return { systemPrompt, userPrompt };
}
```

**Storage**: `lib/aiPrompt.ts`

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Score Calculation Correctness

*For any* array of 20 response values where each value is between 0 and 4 inclusive, the calculated total score should equal the sum of all response values and be between 0 and 80 inclusive.

**Validates: Requirements 3.6, 4.1, 4.2**

---

### Property 2: Faixa Classification Correctness

*For any* valid score between 0 and 80, the system should classify it into exactly one faixa according to these rules:
- 0-20 → "poucos-indicios"
- 21-40 → "sinais-moderados"  
- 41-60 → "forte-padrao"
- 61-80 → "padrao-intenso"

**Validates: Requirements 4.3**

---

### Property 3: Question Count Invariant

*For any* state of the questionnaire, the total number of questions presented should always be exactly 20.

**Validates: Requirements 3.1**

---

### Property 4: Response Scale Consistency

*For any* question in the questionnaire, the response options should provide exactly 5 values: 0, 1, 2, 3, and 4.

**Validates: Requirements 3.3**

---

### Property 5: Progress Calculation Accuracy

*For any* number of answered questions (n) out of total questions (20), the progress percentage should equal (n / 20) * 100.

**Validates: Requirements 3.4**

---

### Property 6: Navigation Bidirectionality

*For any* question index i where 0 < i < 19, navigating forward then backward should return to the original question index i.

**Validates: Requirements 3.5**

---

### Property 7: Response Persistence

*For any* question that has been answered with value v, navigating away and returning to that question should display the previously selected value v.

**Validates: Requirements 3.7**

---

### Property 8: API Request Structure Completeness

*For any* valid score submission to the API, the request payload should contain both the numerical score and the corresponding faixa classification.

**Validates: Requirements 7.2**

---

### Property 9: IA Response Structure Validation

*For any* successful IA API response, the response should contain exactly 2 reflective questions in the reflectiveQuestions array.

**Validates: Requirements 5.5, 11.2**

---

### Property 10: Client-Side Privacy Preservation

*For any* API request to `/api/diagnostico`, the request payload should contain only the final numerical score and should not contain the array of individual question responses.

**Validates: Requirements 9.1, 9.2, 9.3, 9.4**

---

### Property 11: Animation Duration Constraint

*For any* page transition or UI animation, the animation duration should be greater than or equal to 300ms and less than or equal to 600ms.

**Validates: Requirements 1.3, 10.5**

---

### Property 12: Contrast Ratio Accessibility

*For any* text element in the UI, the contrast ratio between text color and background color should meet WCAG AA standards (minimum 4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 1.5**

---

### Property 13: Responsive Layout Integrity

*For any* viewport width between 320px and 2560px, all UI elements should remain visible and functional without horizontal scrolling or layout breaking.

**Validates: Requirements 12.1**

---

### Property 14: Touch Target Accessibility

*For any* interactive element (buttons, links, form inputs) on mobile viewports, the minimum touch target size should be 44x44 pixels.

**Validates: Requirements 12.4**

---

### Property 15: Input Sanitization

*For any* IA response received from the external service, the response text should be sanitized to remove potentially harmful HTML/JavaScript before rendering to the user.

**Validates: Requirements 7.6**

---

## Error Handling

### Client-Side Errors

**Invalid Response Values**:
- If a user somehow submits a response outside 0-4 range, clamp to nearest valid value
- Log warning to console for debugging

**Navigation Errors**:
- If attempting to navigate before first question, stay at index 0
- If attempting to navigate past last question, stay at index 19

**State Corruption**:
- If response array length ≠ 20, reset questionnaire with user confirmation
- Preserve partial progress when possible

### API Errors

**IA Service Timeout**:
- After 30 seconds, cancel request
- Display fallback message: "Estamos processando sua resposta. Por favor, tente novamente em alguns instantes."
- Provide retry button

**IA Service Failure (4xx/5xx)**:
- Display empathetic fallback message based on faixa
- Log error details for monitoring
- Provide contact option for support

**Network Errors**:
- Detect offline state
- Display: "Parece que você está offline. Verifique sua conexão e tente novamente."
- Cache score locally for retry

### Fallback Messages by Faixa

```typescript
const fallbackMessages = {
  'poucos-indicios': 'Sua pontuação indica poucos indícios de padrões narcísicos na relação com sua mãe. Isso sugere que você teve uma base emocional relativamente saudável.',
  
  'sinais-moderados': 'Sua pontuação indica sinais moderados de padrões narcísicos. Alguns comportamentos podem ter impactado sua autoestima e relacionamentos.',
  
  'forte-padrao': 'Sua pontuação indica um forte padrão de comportamentos narcísicos. É provável que isso tenha afetado significativamente seu desenvolvimento emocional.',
  
  'padrao-intenso': 'Sua pontuação indica um padrão intenso de abuso emocional. É importante reconhecer que isso não foi culpa sua e que você merece apoio.'
};
```

---

## Testing Strategy

### Overview

This project will use a **dual testing approach** combining unit tests and property-based tests to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property-based tests**: Verify universal properties across all inputs

Both types of tests are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across the entire input space.

### Property-Based Testing Framework

**Framework**: `fast-check` (TypeScript/JavaScript property-based testing library)

**Installation**:
```bash
npm install --save-dev fast-check @types/fast-check
```

**Configuration**:
- Minimum 100 iterations per property test
- Each property test must reference its design document property number
- Tag format: `// Feature: narcisismo-materno-diagnostico, Property {N}: {property_text}`

### Test Organization

```
__tests__/
├── unit/
│   ├── components/
│   │   ├── ProgressBar.test.tsx
│   │   ├── QuestionCard.test.tsx
│   │   └── ResultCard.test.tsx
│   ├── lib/
│   │   ├── scoring.test.ts
│   │   └── aiPrompt.test.ts
│   └── api/
│       └── diagnostico.test.ts
├── properties/
│   ├── scoring.properties.test.ts
│   ├── navigation.properties.test.ts
│   ├── privacy.properties.test.ts
│   └── accessibility.properties.test.ts
└── integration/
    └── questionnaire-flow.test.tsx
```

### Property Test Examples

**Example 1: Score Calculation (Property 1)**

```typescript
// Feature: narcisismo-materno-diagnostico, Property 1: Score Calculation Correctness
import fc from 'fast-check';
import { calculateScore } from '@/lib/scoring';

describe('Property 1: Score Calculation Correctness', () => {
  it('should calculate correct score for any valid response array', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer({ min: 0, max: 4 }), { minLength: 20, maxLength: 20 }),
        (responses) => {
          const result = calculateScore(responses);
          const expectedSum = responses.reduce((sum, val) => sum + val, 0);
          
          expect(result.total).toBe(expectedSum);
          expect(result.total).toBeGreaterThanOrEqual(0);
          expect(result.total).toBeLessThanOrEqual(80);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Example 2: Faixa Classification (Property 2)**

```typescript
// Feature: narcisismo-materno-diagnostico, Property 2: Faixa Classification Correctness
import fc from 'fast-check';
import { determineFaixa } from '@/lib/scoring';

describe('Property 2: Faixa Classification Correctness', () => {
  it('should classify any score into exactly one correct faixa', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 80 }),
        (score) => {
          const faixa = determineFaixa(score);
          
          if (score <= 20) {
            expect(faixa).toBe('poucos-indicios');
          } else if (score <= 40) {
            expect(faixa).toBe('sinais-moderados');
          } else if (score <= 60) {
            expect(faixa).toBe('forte-padrao');
          } else {
            expect(faixa).toBe('padrao-intenso');
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Test Examples

**Example: Edge Cases for Score Calculation**

```typescript
describe('Score Calculation Edge Cases', () => {
  it('should return 0 for all zero responses', () => {
    const responses = Array(20).fill(0);
    const result = calculateScore(responses);
    expect(result.total).toBe(0);
    expect(result.faixa).toBe('poucos-indicios');
  });

  it('should return 80 for all maximum responses', () => {
    const responses = Array(20).fill(4);
    const result = calculateScore(responses);
    expect(result.total).toBe(80);
    expect(result.faixa).toBe('padrao-intenso');
  });

  it('should handle boundary between faixas correctly', () => {
    // Score of exactly 20
    expect(determineFaixa(20)).toBe('poucos-indicios');
    // Score of exactly 21
    expect(determineFaixa(21)).toBe('sinais-moderados');
  });
});
```

### Integration Tests

**Questionnaire Flow**:
- Test complete user journey from landing → questionnaire → result
- Mock IA API responses
- Verify state transitions
- Test error recovery

### Accessibility Tests

**Tools**:
- `jest-axe` for automated accessibility testing
- Manual testing with screen readers
- Keyboard navigation testing

**Coverage**:
- Color contrast ratios (Property 12)
- Touch target sizes (Property 14)
- ARIA labels and roles
- Keyboard focus management

### Performance Tests

**Metrics**:
- Lighthouse CI in GitHub Actions
- Core Web Vitals monitoring
- Bundle size tracking

**Thresholds**:
- Performance score ≥ 80
- First Contentful Paint < 2s
- Time to Interactive < 3s on 3G

---

## Deployment Considerations

### Environment Variables

```env
# .env.local (development)
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=http://localhost:3000

# .env.production
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
```

### Security Headers

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];
```

### Monitoring

**Recommended Tools**:
- Vercel Analytics (built-in)
- Sentry for error tracking
- PostHog for user behavior (privacy-compliant)

**Key Metrics**:
- API response times
- IA service success rate
- User completion rate (landing → result)
- Conversion rate (result → CTA click)

---

## Future Enhancements

### Phase 2 Considerations

1. **Multi-language Support**: Portuguese, Spanish, English
2. **Results History**: Allow users to save and compare results over time (with consent)
3. **Expanded Question Bank**: A/B test different question sets
4. **Enhanced IA Prompts**: Fine-tune based on user feedback
5. **Email Results**: Option to receive results via email
6. **Community Resources**: Link to support groups and therapists

### Scalability

- Current architecture supports 10k+ concurrent users
- IA API rate limiting may require queue system at scale
- Consider caching common IA responses for similar scores
- CDN for static assets (Vercel handles this automatically)

---

## Conclusion

This design provides a solid foundation for a therapeutic, privacy-focused diagnostic tool. The architecture prioritizes user emotional safety, data privacy, and conversion optimization while maintaining technical excellence through comprehensive testing and modern web standards.

The controlled IA integration ensures legal safety while providing personalized value. The dual testing strategy (unit + property-based) guarantees correctness across all scenarios.

Next step: Create implementation task list based on this design.
