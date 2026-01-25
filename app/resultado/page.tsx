'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ResultCard } from '@/components/ResultCard';
import { CTAButton } from '@/components/CTAButton';
import type { Faixa } from '@/lib/scoring';

interface DiagnosticoData {
  faixa: Faixa;
  interpretation: string;
  reflectiveQuestions: string[];
}

function ResultadoContent() {
  const searchParams = useSearchParams();
  const scoreParam = searchParams.get('score');
  const score = scoreParam ? parseInt(scoreParam, 10) : null;

  const [data, setData] = useState<DiagnosticoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (score === null || score < 0 || score > 80) {
      setError('Score inválido');
      setIsLoading(false);
      return;
    }

    // Fetch diagnosis from API
    const fetchDiagnosis = async () => {
      try {
        const response = await fetch('/api/diagnostico', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ score }),
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar diagnóstico');
        }

        const result: DiagnosticoData = await response.json();
        setData(result);
      } catch (err: any) {
        console.error('Error fetching diagnosis:', err);
        setError('Não foi possível carregar o resultado. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiagnosis();
  }, [score]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="mb-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
          <p className="text-xl text-foreground">Analisando seu resultado...</p>
          <p className="text-sm text-muted mt-2">Isso pode levar alguns segundos</p>
        </motion.div>
      </main>
    );
  }

  if (error || !data || score === null) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-secondary rounded-lg p-8 shadow-lg text-center"
        >
          <h1 className="text-2xl font-bold text-red-400 mb-4">Erro</h1>
          <p className="text-foreground mb-6">
            {error || 'Não foi possível carregar o resultado.'}
          </p>
          <CTAButton text="Voltar ao Início" href="/" variant="secondary" />
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Seu Resultado
          </h1>
          <p className="text-muted">
            Uma interpretação personalizada baseada em suas respostas
          </p>
        </motion.div>

        <ResultCard
          score={score}
          faixa={data.faixa}
          interpretation={data.interpretation}
          reflectiveQuestions={data.reflectiveQuestions}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 text-center space-y-6"
        >
          {/* Oferta do E-book - Pitch programado por faixa de pontuação */}
          {score >= 56 ? (
            // PONTUAÇÃO 56-80: Dor consciente - Pitch mais direto
            <div className="bg-secondary rounded-lg p-8 shadow-lg border border-foreground/10">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Isso não foi apenas difícil.<br />
                Isso moldou quem você precisou se tornar.
              </h3>
              <p className="text-foreground/80 text-lg mb-6">
                Entender esse padrão é o primeiro passo para parar de repeti-lo.
              </p>
              
              {/* Oferta do E-book */}
              <div className="bg-background/50 rounded-lg p-6 mb-6 border border-foreground/10">
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  Identidade Negociada
                </h4>
                <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                  Um material de leitura introspectivo que aprofunda o que você acabou de descobrir.
                  <br />
                  Não é autoajuda. É consciência.
                </p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-accent">R$ 29,90</span>
                  <span className="text-foreground/50 text-sm">acesso completo</span>
                </div>
                <CTAButton 
                  text="Acessar o material completo" 
                  href="/checkout" 
                  variant="primary" 
                />
              </div>

              <p className="text-foreground/50 text-xs leading-relaxed">
                Após o pagamento, você terá acesso imediato ao conteúdo completo
                <br />
                e poderá continuar sua jornada no ecossistema Lech Lecha.
              </p>
            </div>
          ) : (
            // PONTUAÇÃO 0-55: Consciência em formação - Pitch mais leve
            <div className="bg-secondary rounded-lg p-8 shadow-lg border border-foreground/10">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Nem todo impacto é visível.<br />
                Alguns se tornam parte de quem somos.
              </h3>
              <p className="text-foreground/80 text-lg mb-6">
                Se algo em você reconheceu esse padrão, talvez valha olhar com mais calma.
              </p>
              
              {/* Oferta do E-book */}
              <div className="bg-background/50 rounded-lg p-6 mb-6 border border-foreground/10">
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  Identidade Negociada
                </h4>
                <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                  Um material de leitura introspectivo que aprofunda o que você acabou de descobrir.
                  <br />
                  Não é autoajuda. É consciência.
                </p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-accent">R$ 29,90</span>
                  <span className="text-foreground/50 text-sm">acesso completo</span>
                </div>
                <CTAButton 
                  text="Acessar o material completo" 
                  href="/checkout" 
                  variant="primary" 
                />
              </div>

              <p className="text-foreground/50 text-xs leading-relaxed">
                Após o pagamento, você terá acesso imediato ao conteúdo completo
                <br />
                e poderá continuar sua jornada no ecossistema Lech Lecha.
              </p>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <CTAButton 
              text="Refazer o Teste" 
              href="/teste" 
              variant="secondary" 
            />
            <CTAButton 
              text="Voltar ao Início" 
              href="/" 
              variant="secondary" 
            />
          </div>

          <p className="text-sm text-muted mt-8">
            Lembre-se: Este não é um diagnóstico clínico. Para questões de saúde mental, 
            consulte um profissional qualificado.
          </p>
        </motion.div>
      </div>
    </main>
  );
}

export default function ResultadoPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
          <p className="text-xl text-foreground">Carregando...</p>
        </div>
      </main>
    }>
      <ResultadoContent />
    </Suspense>
  );
}
