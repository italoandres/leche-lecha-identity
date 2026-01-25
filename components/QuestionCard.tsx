'use client';

import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  currentValue: number | null;
  onAnswer: (value: number) => void;
}

const scaleLabels = [
  'Nunca',
  'Raramente',
  'Às vezes',
  'Frequentemente',
  'Sempre'
];

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  currentValue,
  onAnswer
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-secondary rounded-lg p-8 shadow-lg"
    >
      <div className="mb-6">
        <p className="text-sm text-muted mb-2">
          Pergunta {questionNumber} de {totalQuestions}
        </p>
        <h2 className="text-2xl font-medium text-foreground leading-relaxed">
          {question}
        </h2>
      </div>

      <div className="space-y-3">
        {[0, 1, 2, 3, 4].map((value) => (
          <button
            key={value}
            onClick={() => onAnswer(value)}
            className={`
              w-full p-4 rounded-lg text-left transition-all duration-300
              ${currentValue === value
                ? 'bg-accent text-white shadow-md scale-[1.02]'
                : 'bg-background hover:bg-accent/20 text-foreground'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{scaleLabels[value]}</span>
              <span className="text-sm opacity-70">{value}</span>
            </div>
          </button>
        ))}
      </div>

      <p className="text-sm text-muted mt-6 text-center">
        Escolha a opção que melhor representa sua experiência
      </p>
    </motion.div>
  );
}
