// Feature: narcisismo-materno-diagnostico, Property 1: Score Calculation Correctness
// Feature: narcisismo-materno-diagnostico, Property 2: Faixa Classification Correctness
import fc from 'fast-check';
import { calculateScore, determineFaixa } from '@/lib/scoring';

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
