// Feature: narcisismo-materno-diagnostico, Property 3: Question Count Invariant
import { questions } from '@/lib/questions';

describe('Property 3: Question Count Invariant', () => {
  it('should always have exactly 20 questions', () => {
    expect(questions).toHaveLength(20);
  });

  it('should have sequential IDs from 1 to 20', () => {
    questions.forEach((question, index) => {
      expect(question.id).toBe(index + 1);
    });
  });

  it('should have non-empty text for all questions', () => {
    questions.forEach((question) => {
      expect(question.text).toBeTruthy();
      expect(question.text.length).toBeGreaterThan(0);
    });
  });
});
