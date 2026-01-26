'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProgress } from '@/lib/supabase';

export default function BemVindoPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [readingCompleted, setReadingCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkProgress() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const progress = await getUserProgress(user.id);
        const completed = progress?.completed_chapter_ids?.includes('identidade_negociada') || false;
        setReadingCompleted(completed);
      } catch (error) {
        console.error('Erro ao verificar progresso:', error);
      } finally {
        setLoading(false);
      }
    }

    checkProgress();
  }, [user]);

  return (
    <main className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Título */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="mb-24"
        >
          <h1 
            className="text-4xl md:text-5xl font-light text-foreground mb-16 tracking-wide"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Você entrou.
          </h1>
          
          <div className="space-y-8 text-foreground/80 font-light leading-relaxed text-lg">
            <p>Você não comprou algo.</p>
            <p>Você atravessou um limiar.</p>
            <p>O que está disponível agora não foi feito para te explicar quem você é — mas para interromper padrões que operam sem serem vistos.</p>
            <p className="pt-8">Nada aqui exige pressa.</p>
            <p>Nada aqui pede exposição.</p>
            <p>Nada aqui funciona por consumo.</p>
          </div>
        </motion.div>

        {/* Bloco 1: Leitura */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="mb-32 pb-16 border-b border-foreground/10"
        >
          <h2 
            className="text-2xl font-light text-foreground/90 mb-8"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Sua leitura está disponível
          </h2>
          
          <div className="space-y-6 text-foreground/70 font-light leading-relaxed mb-12">
            <p>Ela começa onde quase todos os conteúdos param:</p>
            <p className="pl-8">não no rótulo,<br />não no culpado,<br />mas no papel que você precisou aprender para continuar pertencendo.</p>
          </div>

          <button
            onClick={() => router.push('/leitura')}
            className="px-12 py-4 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-500 font-light tracking-wider text-sm"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Acessar a leitura
          </button>

          <p className="text-foreground/50 font-light text-sm mt-6">
            (Identidade Negociada)
          </p>
        </motion.div>

        {/* Bloco 2: App */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="mb-32"
        >
          <h2 
            className="text-2xl font-light text-foreground/90 mb-8"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Quando a leitura termina, a observação começa
          </h2>
          
          <div className="space-y-6 text-foreground/70 font-light leading-relaxed mb-12">
            <p>Algumas coisas não se resolvem com mais informação.</p>
            <p>Elas pedem repetição, silêncio e prática.</p>
            <p>O aplicativo <em>Comece Pela Raiz</em> existe para isso.</p>
            <p className="pt-6">Sem motivação.<br />Sem promessa.<br />Sem performance.</p>
          </div>

          <button
            onClick={() => {
              if (readingCompleted) {
                window.open('https://lechlecha.app', '_blank');
              }
            }}
            disabled={!readingCompleted}
            className={`px-12 py-4 border border-foreground/20 font-light tracking-wider text-sm transition-all duration-500 ${
              readingCompleted 
                ? 'text-foreground hover:bg-foreground/5 cursor-pointer' 
                : 'text-foreground/30 cursor-not-allowed'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Entrar no app
          </button>

          {!readingCompleted && (
            <p className="text-foreground/40 font-light text-xs mt-6">
              Disponível após concluir a leitura
            </p>
          )}
        </motion.div>

        {/* Fechamento */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
          className="text-center pt-16 border-t border-foreground/10"
        >
          <div className="space-y-6 text-foreground/60 font-light leading-relaxed">
            <p>Você não está atrasado.</p>
            <p>Você não está quebrado.</p>
            <p>E você não precisa decidir nada agora.</p>
            <p className="pt-8 text-foreground/50">Continue quando fizer sentido.</p>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
