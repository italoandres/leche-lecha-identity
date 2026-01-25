'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Compreenda Seus Padrões Emocionais
          </h1>
          <p className="text-xl text-muted">
            Um teste reflexivo sobre sua relação com sua mãe
          </p>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-secondary rounded-lg p-8 shadow-lg mb-8"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Sobre este teste
          </h2>
          
          <div className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Este questionário foi desenvolvido para ajudá-lo a identificar padrões emocionais 
              que podem ter se formado durante sua infância e adolescência.
            </p>
            
            <p>
              Você responderá a 20 perguntas sobre sua experiência. Ao final, receberá uma 
              interpretação clara do padrão emocional vivido e como isso pode estar impactando 
              sua vida hoje.
            </p>

            <div className="bg-background rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-accent mb-3">
                Instruções
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Responda com sinceridade, pensando na sua infância e adolescência</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Não existem respostas certas ou erradas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Suas respostas são confidenciais e não serão armazenadas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>O teste leva aproximadamente 5-10 minutos</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center"
        >
          <Link
            href="/cadastro"
            className="inline-block bg-accent text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:scale-105 min-w-[44px] min-h-[44px]"
          >
            Começar o Teste
          </Link>
          
          <p className="text-sm text-muted mt-4">
            Este não é um diagnóstico clínico. Para questões de saúde mental, 
            consulte um profissional qualificado.
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
