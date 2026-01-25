'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function ContinuidadePage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleContinue = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      // Atualizar user_progress para marcar que completou a leitura
      await supabase
        .from('user_progress')
        .update({
          last_updated: new Date().toISOString()
        })
        .eq('user_id', user.id);

      // Marcar no localStorage também (para compatibilidade)
      if (typeof window !== 'undefined') {
        localStorage.setItem('lech_lecha_user_status', 'initiated');
      }

      // Redirecionar para instruções do app
      router.push('/app-redirect');
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
      // Mesmo com erro, permite continuar
      router.push('/app-redirect');
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <p 
            className="text-2xl md:text-3xl font-light text-foreground/90 leading-relaxed mb-8"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Você não saiu do lugar onde começou.
            <br />
            Mas não está mais no mesmo ponto.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          <p 
            className="text-lg font-light text-foreground/70 leading-relaxed mb-16"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            O que foi visto não exige reação.
            <br />
            Exige continuidade.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
        >
          <button
            onClick={handleContinue}
            className="px-12 py-4 border border-foreground/20 text-foreground/80 hover:bg-foreground/5 font-light text-sm tracking-wider transition-all duration-500"
          >
            Continuar
          </button>
        </motion.div>

      </div>
    </main>
  );
}
