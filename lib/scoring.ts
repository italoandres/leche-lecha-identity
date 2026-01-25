export type Faixa = 'poucos-indicios' | 'sinais-moderados' | 'forte-padrao' | 'padrao-intenso';

export interface Score {
  total: number;
  faixa: Faixa;
}

export function calculateScore(responses: number[]): Score {
  if (responses.length !== 20) {
    throw new Error('Deve haver exatamente 20 respostas');
  }

  // Validar que todas as respostas estão no range 0-4
  for (const response of responses) {
    if (response < 0 || response > 4) {
      throw new Error('Todas as respostas devem estar entre 0 e 4');
    }
  }

  const total = responses.reduce((sum, val) => sum + val, 0);
  const faixa = determineFaixa(total);

  return { total, faixa };
}

export function determineFaixa(score: number): Faixa {
  if (score < 0 || score > 80) {
    throw new Error('Score deve estar entre 0 e 80');
  }

  if (score <= 20) return 'poucos-indicios';
  if (score <= 40) return 'sinais-moderados';
  if (score <= 60) return 'forte-padrao';
  return 'padrao-intenso';
}
