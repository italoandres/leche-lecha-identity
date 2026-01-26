'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function BemVindoPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center mb-20"
        >
          <h1 
            className="text-4xl md:text-5xl font-light text-foreground mb-6 tracking-wide"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Bem-vindo ao ecossistema Lech Lecha
          </h1>
          <p className="text-foreground/70 font-light text-lg leading-relaxed max-w-2xl mx-auto">
            Você não comprou um produto. Você entrou em um espaço de escuta, reflexão e continuidade.
          </p>
        </motion.div>

        {/* Seção: Sua Leitura Personalizada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-16 pb-16 border-b border-foreground/10"
        >
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1">
              <h2 
                className="text-2xl font-light text-foreground mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Sua leitura personalizada está pronta
              </h2>
              <p className="text-foreground/70 font-light leading-relaxed mb-6">
                Baseada no seu teste, criamos uma análise profunda sobre <strong>Identidade Negociada</strong> — 
                o processo silencioso de adaptação emocional que molda quem você se tornou.
              </p>
              <p className="text-foreground/70 font-light leading-relaxed mb-8">
                Não é sobre rotular ninguém. É sobre entender os papéis emocionais que você aprendeu a desempenhar 
                para manter vínculos — e como isso ainda opera hoje.
              </p>
              <button
                onClick={() => router.push('/leitura')}
                className="px-12 py-4 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-500 font-light tracking-widest text-sm uppercase"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Acessar Minha Leitura
              </button>
            </div>
            <div className="flex-1 bg-foreground/5 p-8 border border-foreground/10">
              <p className="text-foreground/60 font-light text-sm mb-4 tracking-wide">
                O QUE VOCÊ VAI ENCONTRAR
              </p>
              <ul className="space-y-3 text-foreground/70 font-light">
                <li>• Introdução: Antes do rótulo</li>
                <li>• Cap. I: O erro de procurar culpados</li>
                <li>• Cap. II: Antes do rótulo, existiu uma adaptação</li>
                <li>• Cap. III: O papel emocional que você aprendeu</li>
                <li>• Cap. IV: Quando o papel vira identidade</li>
                <li>• Cap. V: Quando o que te sustentou começa a cansar</li>
                <li>• Cap. VI: O medo de existir sem o papel</li>
                <li>• Cap. VII: Quando você percebe — e ainda não sabe o que fazer</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Seção: App Lech Lecha */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
            <div className="flex-1">
              <h2 
                className="text-2xl font-light text-foreground mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Conheça o App Lech Lecha
              </h2>
              <p className="text-foreground/70 font-light leading-relaxed mb-6">
                <strong>Comece pela Raiz</strong> é um aplicativo de reflexão diária que te ajuda a 
                reconhecer padrões emocionais antes que eles se repitam.
              </p>
              <p className="text-foreground/70 font-light leading-relaxed mb-6">
                Não é autoajuda. Não é motivação. É um espaço para pausar, observar e nomear o que está acontecendo — 
                sem julgamento, sem pressa.
              </p>
              <p className="text-foreground/70 font-light leading-relaxed mb-8">
                Disponível para iOS e Android. Gratuito para membros do ecossistema Lech Lecha.
              </p>
              <button
                onClick={() => window.open('https://lechlecha.app', '_blank')}
                className="px-12 py-4 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-500 font-light tracking-widest text-sm uppercase"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Conhecer o App
              </button>
            </div>
            <div className="flex-1 bg-foreground/5 p-8 border border-foreground/10">
              <p className="text-foreground/60 font-light text-sm mb-4 tracking-wide">
                RECURSOS DO APP
              </p>
              <ul className="space-y-3 text-foreground/70 font-light">
                <li>• Reflexões diárias guiadas</li>
                <li>• Rastreamento de padrões emocionais</li>
                <li>• Exercícios de reconhecimento de papéis</li>
                <li>• Biblioteca de conceitos (Identidade Negociada, Lealdade Emocional, etc.)</li>
                <li>• Comunidade privada de membros</li>
                <li>• Sem anúncios, sem gamificação</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Seção: Comunidade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-center py-16 border-t border-foreground/10"
        >
          <p className="text-foreground/70 font-light leading-relaxed text-lg mb-6">
            Você não está sozinho nesse processo.
          </p>
          <p className="text-foreground/60 font-light leading-relaxed max-w-2xl mx-auto">
            O ecossistema Lech Lecha existe para quem busca clareza, não respostas prontas. 
            Para quem quer entender, não apenas reagir. Para quem sabe que o caminho é longo — 
            e prefere caminhar com consciência.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center pt-12"
        >
          <p className="text-foreground/50 font-light text-sm">
            Qualquer dúvida, responda o email de boas-vindas que enviamos.
          </p>
        </motion.div>

      </div>
    </main>
  );
}
