import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { determineFaixa, type Faixa } from '@/lib/scoring';
import { buildPrompt, fallbackMessages } from '@/lib/aiPrompt';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface DiagnosticoResponse {
  faixa: Faixa;
  interpretation: string;
  reflectiveQuestions: string[];
}

export interface DiagnosticoRequest {
  score: number;
}

// Sanitize HTML/JS from text
function sanitizeText(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

export async function POST(request: NextRequest) {
  try {
    const body: DiagnosticoRequest = await request.json();
    const { score } = body;

    // Validate score
    if (typeof score !== 'number' || score < 0 || score > 80) {
      return NextResponse.json(
        { error: 'Score inválido. Deve estar entre 0 e 80.' },
        { status: 400 }
      );
    }

    // Determine faixa
    const faixa = determineFaixa(score);

    // Build prompt
    const { systemPrompt, userPrompt } = buildPrompt(score, faixa);

    try {
      // Call OpenAI API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const completion = await openai.chat.completions.create(
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 800,
        },
        { signal: controller.signal as any }
      );

      clearTimeout(timeoutId);

      const aiResponse = completion.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error('Resposta vazia da IA');
      }

      // Parse JSON response
      let parsedResponse: { interpretation: string; reflectiveQuestions: string[] };
      
      try {
        // Try to extract JSON from response (in case there's extra text)
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : aiResponse;
        parsedResponse = JSON.parse(jsonString);
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        throw new Error('Formato de resposta inválido');
      }

      // Validate response structure
      if (!parsedResponse.interpretation || !Array.isArray(parsedResponse.reflectiveQuestions)) {
        throw new Error('Estrutura de resposta inválida');
      }

      if (parsedResponse.reflectiveQuestions.length !== 2) {
        console.warn('AI returned wrong number of questions, adjusting...');
        parsedResponse.reflectiveQuestions = parsedResponse.reflectiveQuestions.slice(0, 2);
        
        // If less than 2, add generic questions
        while (parsedResponse.reflectiveQuestions.length < 2) {
          parsedResponse.reflectiveQuestions.push('Como você se sente ao refletir sobre esses padrões?');
        }
      }

      // Sanitize response
      const sanitizedInterpretation = sanitizeText(parsedResponse.interpretation);
      const sanitizedQuestions = parsedResponse.reflectiveQuestions.map(q => sanitizeText(q));

      const response: DiagnosticoResponse = {
        faixa,
        interpretation: sanitizedInterpretation,
        reflectiveQuestions: sanitizedQuestions,
      };

      return NextResponse.json(response);

    } catch (aiError: any) {
      console.error('AI API Error:', aiError);

      // Return fallback message
      const fallbackInterpretation = fallbackMessages[faixa];
      const fallbackQuestions = [
        'Como você se sente ao refletir sobre esses padrões?',
        'Que mudanças você gostaria de ver em seus relacionamentos?'
      ];

      const response: DiagnosticoResponse = {
        faixa,
        interpretation: fallbackInterpretation,
        reflectiveQuestions: fallbackQuestions,
      };

      return NextResponse.json(response);
    }

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar diagnóstico', details: error.message },
      { status: 500 }
    );
  }
}
