'use client';

import { motion } from 'framer-motion';
import type { Faixa } from '@/lib/scoring';

interface ResultCardProps {
  score: number;
  faixa: Faixa;
  interpretation: string;
  reflectiveQuestions: string[];
}

const faixaLabels: Record<Faixa, string> = {
  'poucos-indicios': 'Poucos Indícios',
  'sinais-moderados': 'Sinais Moderados',
  'forte-padrao': 'Forte Padrão',
  'padrao-intenso': 'Padrão Intenso'
};

const faixaColors: Record<Faixa, string> = {
  'poucos-indicios': 'text-green-400',
  'sinais-moderados': 'text-yellow-400',
  'forte-padrao': 'text-orange-400',
  'padrao-intenso': 'text-red-400'
};

export function ResultCard({
  score,
  faixa,
  interpretation,
  reflectiveQuestions
}: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary rounded-lg p-8 shadow-lg max-w-3xl mx-auto"
    >
      {/* Score Display */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-4"
        >
          <div className="text-6xl font-bold text-accent mb-2">
            {score}
            <span className="text-2xl text-muted">/80</span>
          </div>
          <div className={`text-xl font-medium ${faixaColors[faixa]}`}>
            {faixaLabels[faixa]}
          </div>
        </motion.div>
      </div>

      {/* Interpretation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Interpretação
        </h3>
        <div className="text-foreground/90 leading-relaxed whitespace-pre-line">
          {interpretation}
        </div>
      </motion.div>

      {/* Reflective Questions */}
      {reflectiveQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Perguntas para Reflexão
          </h3>
          <div className="space-y-4">
            {reflectiveQuestions.map((question, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-4 border-l-4 border-accent"
              >
                <p className="text-foreground/90">{question}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
