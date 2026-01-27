'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProgress, markReadingComplete } from '@/lib/supabase';
import Link from 'next/link';

const chapters = [
  {
    id: 'intro',
    number: 'Introdução',
    title: 'Identidade Negociada'
  },
  {
    id: 'cap1',
    number: 'I',
    title: 'O erro de procurar culpados'
  },
  {
    id: 'cap2',
    number: 'II',
    title: 'Antes do rótulo, existiu uma adaptação'
  },
  {
    id: 'cap3',
    number: 'III',
    title: 'O papel emocional que você aprendeu a desempenhar'
  },
  {
    id: 'cap4',
    number: 'IV',
    title: 'Quando o papel começa a se confundir com quem você é'
  },
  {
    id: 'cap5',
    number: 'V',
    title: 'Quando o que te sustentou começa a te cansar'
  },
  {
    id: 'cap6',
    number: 'VI',
    title: 'O medo de existir sem o papel'
  },
  {
    id: 'cap7',
    number: 'VII',
    title: 'Quando você percebe — e ainda não sabe o que fazer'
  }
];

export default function CapitulosPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const progress = await getUserProgress(user.id);
        setCompletedChapters(progress?.completed_chapter_ids || []);
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, [user, router]);

  const handleMarkComplete = async () => {
    if (!user) return;

    try {
      await markReadingComplete(user.id);
      setCompletedChapters(['identidade_negociada']);
      alert('Leitura marcada como concluída! ✓');
    } catch (error) {
      console.error('Erro ao marcar como concluída:', error);
      alert('Erro ao marcar leitura como concluída');
    }
  };

  const isReadingComplete = completedChapters.includes('identidade_negociada');

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground/70 font-light">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 
            className="text-3xl font-light text-foreground mb-4 tracking-wide"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Identidade Negociada
          </h1>
          <p className="text-foreground/60 font-light text-sm tracking-wider">
            ÍNDICE DE CAPÍTULOS
          </p>
        </motion.div>

        {/* Lista de capítulos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-4 mb-16"
        >
          <p className="text-foreground/60 font-light text-sm mb-8 text-center">
            Clique em "Começar leitura" para acessar todos os capítulos
          </p>
          
          {chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className="px-8 py-6 border border-foreground/10 bg-secondary/10"
            >
              <p className="text-muted/60 text-xs font-light tracking-wider mb-2">
                {chapter.number}
              </p>
              <p className="text-foreground/80 font-light text-lg">
                {chapter.title}
              </p>
            </div>
          ))}
          
          <div className="text-center mt-12">
            <Link
              href="/leitura"
              className="inline-block px-12 py-4 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-300 font-light tracking-wide text-sm"
            >
              Começar leitura
            </Link>
          </div>
        </motion.div>

        {/* Ações */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pt-8 border-t border-foreground/10 space-y-6"
        >
          {/* Marcar como concluída */}
          {!isReadingComplete && (
            <div className="text-center">
              <button
                onClick={handleMarkComplete}
                className="px-12 py-4 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-300 font-light tracking-wide text-sm"
              >
                Marcar leitura como concluída
              </button>
              <p className="text-foreground/50 font-light text-xs mt-4">
                Isso liberará o acesso ao app
              </p>
            </div>
          )}

          {/* Status de conclusão */}
          {isReadingComplete && (
            <div className="text-center">
              <p className="text-foreground/70 font-light mb-4">
                ✓ Leitura concluída
              </p>
              <Link
                href="/bem-vindo"
                className="inline-block px-12 py-4 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-300 font-light tracking-wide text-sm"
              >
                Voltar à página inicial
              </Link>
            </div>
          )}
        </motion.div>

      </div>
    </main>
  );
}
