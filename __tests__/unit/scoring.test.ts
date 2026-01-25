import { calculateScore, determineFaixa } from '@/lib/scoring';

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

  it('should handle boundary between poucos-indicios and sinais-moderados', () => {
    expect(determineFaixa(20)).toBe('poucos-indicios');
    expect(determineFaixa(21)).toBe('sinais-moderados');
  });

  it('should handle boundary between sinais-moderados and forte-padrao', () => {
    expect(determineFaixa(40)).toBe('sinais-moderados');
    expect(determineFaixa(41)).toBe('forte-padrao');
  });

  it('should handle boundary between forte-padrao and padrao-intenso', () => {
    expect(determineFaixa(60)).toBe('forte-padrao');
    expect(determineFaixa(61)).toBe('padrao-intenso');
  });

  it('should throw error for invalid response count', () => {
    expect(() => calculateScore([1, 2, 3])).toThrow('Deve haver exatamente 20 respostas');
  });

  it('should throw error for response out of range', () => {
    const responses = Array(20).fill(2);
    responses[0] = 5; // Invalid
    expect(() => calculateScore(responses)).toThrow('Todas as respostas devem estar entre 0 e 4');
  });

  it('should throw error for negative response', () => {
    const responses = Array(20).fill(2);
    responses[0] = -1; // Invalid
    expect(() => calculateScore(responses)).toThrow('Todas as respostas devem estar entre 0 e 4');
  });

  it('should throw error for score out of range', () => {
    expect(() => determineFaixa(-1)).toThrow('Score deve estar entre 0 e 80');
    expect(() => determineFaixa(81)).toThrow('Score deve estar entre 0 e 80');
  });
});
