'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProgress, toggleChapterComplete } from '@/lib/supabase';
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

  const handleToggleChapter = async (chapterId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita navegação ao clicar no checkbox
    if (!user) return;

    try {
      const updatedProgress = await toggleChapterComplete(user.id, chapterId);
      setCompletedChapters(updatedProgress.completed_chapter_ids || []);
    } catch (error) {
      console.error('Erro ao atualizar capítulo:', error);
    }
  };

  const handleChapterClick = (index: number) => {
    // Navegar para /leitura com parâmetro de capítulo
    router.push(`/leitura?chapter=${index}`);
  };

  const completedCount = completedChapters.filter(id => id !== 'identidade_negociada').length;
  const totalChapters = chapters.length;
  const progressPercentage = (completedCount / totalChapters) * 100;
  const allChaptersCompleted = completedCount === totalChapters;

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
          className="mb-12 text-center"
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

        {/* Barra de progresso */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-foreground/60 font-light text-sm">
              Progresso da leitura
            </p>
            <p className="text-foreground/60 font-light text-sm">
              {completedCount} de {totalChapters} capítulos
            </p>
          </div>
          <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-green-500/50"
            />
          </div>
        </motion.div>

        {/* Comunicado de conclusão */}
        {allChaptersCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 px-8 py-6 border border-green-500/20 bg-green-500/5"
          >
            <p 
              className="text-foreground/80 font-light text-center mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Acesso ao app Comece pela Raiz liberado
            </p>
            <div className="text-center">
              <Link
                href="/bem-vindo"
                className="inline-block px-10 py-3 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-300 font-light tracking-wide text-sm"
              >
                Entrar no app
              </Link>
            </div>
          </motion.div>
        )}

        {/* Lista de capítulos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-4 mb-16"
        >
          {chapters.map((chapter, index) => {
            const isComplete = completedChapters.includes(chapter.id);
            
            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.05), duration: 0.5 }}
                onClick={() => handleChapterClick(index)}
                className={`
                  px-8 py-6 border cursor-pointer
                  transition-all duration-300
                  ${isComplete 
                    ? 'border-green-500/30 bg-green-500/5 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                    : 'border-foreground/10 bg-secondary/10 hover:bg-foreground/5'
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-muted/60 text-xs font-light tracking-wider mb-2">
                      {chapter.number}
                    </p>
                    <p className="text-foreground/80 font-light text-lg">
                      {chapter.title}
                    </p>
                  </div>
                  
                  {/* Checkbox */}
                  <button
                    onClick={(e) => handleToggleChapter(chapter.id, e)}
                    className={`
                      ml-4 w-6 h-6 border-2 rounded flex items-center justify-center
                      transition-all duration-300 flex-shrink-0
                      ${isComplete 
                        ? 'border-green-500/50 bg-green-500/20' 
                        : 'border-foreground/20 hover:border-foreground/40'
                      }
                    `}
                  >
                    {isComplete && (
                      <svg 
                        className="w-4 h-4 text-green-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={3} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Botão voltar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center pt-8 border-t border-foreground/10"
        >
          <Link
            href="/bem-vindo"
            className="inline-block px-12 py-4 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-300 font-light tracking-wide text-sm"
          >
            Voltar à página inicial
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
