'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AcessoPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* TOPO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-3xl md:text-4xl font-light text-foreground mb-3 tracking-wide">
            IDENTIDADE NEGOCIADA
          </h1>
          <p className="text-sm text-muted font-light tracking-wider">
            Acesso
          </p>
          <p className="text-xs text-muted/60 mt-4 font-light">
            Um material de leitura consciente
          </p>
        </motion.div>

        {/* BLOCO 1 — CONTEXTO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-foreground/90 leading-relaxed text-center font-light text-lg">
            Este material não é para todos.<br />
            Não é motivacional.<br />
            Não é diagnóstico.<br />
            E não promete consertar nada.
          </p>
          <p className="text-foreground/90 leading-relaxed text-center font-light text-lg mt-6">
            Ele existe para quem percebeu que algo foi moldado—<br />
            e quer entender como isso aconteceu,<br />
            não quem deve ser culpado.
          </p>
        </motion.div>

        {/* BLOCO 2 — O QUE É */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16 border-t border-foreground/10 pt-16"
        >
          <p className="text-foreground/80 leading-relaxed font-light">
            Identidade Negociada é um material curto,<br />
            dividido em 7 capítulos,<br />
            voltado para compreender<br />
            como padrões emocionais de adaptação<br />
            influenciaram a forma como você aprendeu a existir,<br />
            pertencer e se posicionar no mundo.
          </p>
          <p className="text-foreground/80 leading-relaxed font-light mt-6">
            Não há exercícios.<br />
            Não há tarefas.<br />
            Não há técnicas.<br />
            Apenas compreensão.
          </p>
        </motion.div>

        {/* BLOCO 3 — PARA QUEM FAZ SENTIDO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-16 border-t border-foreground/10 pt-16"
        >
          <p className="text-foreground/80 leading-relaxed font-light mb-6">
            Este acesso pode fazer sentido se você:
          </p>
          <div className="space-y-3 text-foreground/70 font-light">
            <p>— veio de conteúdos sobre narcisismo e sentiu que algo ainda ficou em aberto</p>
            <p>— entende o comportamento do outro, mas não entende por que se sente assim</p>
            <p>— percebe padrões em si mesmo</p>
            <p>— cansou de rótulos e explicações rasas</p>
            <p>— sente que algo foi negociado para manter vínculos</p>
          </div>
        </motion.div>

        {/* BLOCO 4 — ACESSO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="border-t border-foreground/10 pt-16 text-center"
        >
          <p className="text-foreground/80 font-light mb-8">
            O acesso é imediato.
          </p>
          
          <Link
            href="/checkout"
            className="inline-block px-12 py-4 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-300 font-light tracking-wide text-sm"
          >
            Acessar Identidade Negociada
          </Link>
          
          <p className="text-muted/60 text-sm font-light mt-6">
            Valor: $7.50 USD
          </p>
        </motion.div>

        {/* Espaçamento final */}
        <div className="h-32"></div>

      </div>
    </main>
  );
}
