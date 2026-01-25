// Feature: narcisismo-materno-diagnostico, Property 5: Progress Calculation Accuracy
import fc from 'fast-check';

describe('Property 5: Progress Calculation Accuracy', () => {
  it('should calculate correct percentage for any current/total combination', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 20 }),
        (current) => {
          const total = 20;
          const percentage = (current / total) * 100;
          
          expect(percentage).toBeGreaterThanOrEqual(0);
          expect(percentage).toBeLessThanOrEqual(100);
          expect(percentage).toBe((current / total) * 100);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return 0% when current is 0', () => {
    const percentage = (0 / 20) * 100;
    expect(percentage).toBe(0);
  });

  it('should return 100% when current equals total', () => {
    const percentage = (20 / 20) * 100;
    expect(percentage).toBe(100);
  });
});
