'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionCard } from '@/components/QuestionCard';
import { questions } from '@/lib/questions';
import { calculateScore } from '@/lib/scoring';

export default function TestePage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<(number | null)[]>(Array(20).fill(null));
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = responses.filter(r => r !== null).length;

  const handleAnswer = (value: number) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = value;
    setResponses(newResponses);

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Check if all questions are answered
  useEffect(() => {
    const allAnswered = responses.every(r => r !== null);
    if (allAnswered && !isComplete) {
      setIsComplete(true);
      
      // Calculate score and navigate to results
      const validResponses = responses.filter((r): r is number => r !== null);
      const result = calculateScore(validResponses);
      
      // Navigate to results page with score
      router.push(`/resultado?score=${result.total}`);
    }
  }, [responses, isComplete, router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <ProgressBar 
          current={answeredCount} 
          total={questions.length} 
        />

        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion.text}
            questionNumber={currentQuestion.id}
            totalQuestions={questions.length}
            currentValue={responses[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between mt-6"
        >
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all duration-300
              min-w-[44px] min-h-[44px]
              ${currentQuestionIndex === 0
                ? 'bg-secondary/50 text-muted cursor-not-allowed'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
              }
            `}
          >
            ← Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all duration-300
              min-w-[44px] min-h-[44px]
              ${currentQuestionIndex === questions.length - 1
                ? 'bg-secondary/50 text-muted cursor-not-allowed'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
              }
            `}
          >
            Próxima →
          </button>
        </motion.div>

        {/* Progress Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6 text-sm text-muted"
        >
          {answeredCount === questions.length ? (
            <p className="text-accent font-medium">
              Calculando seu resultado...
            </p>
          ) : (
            <p>
              Você pode navegar entre as perguntas usando os botões acima
            </p>
          )}
        </motion.div>
      </div>
    </main>
  );
}
