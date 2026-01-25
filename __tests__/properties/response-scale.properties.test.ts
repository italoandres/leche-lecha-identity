// Feature: narcisismo-materno-diagnostico, Property 4: Response Scale Consistency

describe('Property 4: Response Scale Consistency', () => {
  const validResponseValues = [0, 1, 2, 3, 4];

  it('should have exactly 5 response options', () => {
    expect(validResponseValues).toHaveLength(5);
  });

  it('should have sequential values from 0 to 4', () => {
    validResponseValues.forEach((value, index) => {
      expect(value).toBe(index);
    });
  });

  it('should cover the complete range 0-4', () => {
    expect(Math.min(...validResponseValues)).toBe(0);
    expect(Math.max(...validResponseValues)).toBe(4);
  });
});
