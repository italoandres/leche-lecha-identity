'use client';

import { motion } from 'framer-motion';

export default function AppRedirectPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <p 
            className="text-2xl md:text-3xl font-light text-foreground/90 leading-relaxed mb-12"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            O próximo passo não é mais leitura.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="space-y-8"
        >
          <p 
            className="text-lg font-light text-foreground/70 leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Baixe o app <span className="text-foreground/90">Lech Lecha</span>
            <br />
            e continue de onde parou.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <a
              href="https://apps.apple.com/app/lech-lecha"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-foreground/20 text-foreground/80 hover:bg-foreground/5 font-light text-sm tracking-wider transition-all duration-300"
            >
              App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.lechlecha"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-foreground/20 text-foreground/80 hover:bg-foreground/5 font-light text-sm tracking-wider transition-all duration-300"
            >
              Google Play
            </a>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="text-sm font-light text-foreground/50 mt-12"
          >
            Use o mesmo email para fazer login no app.
            <br />
            Seu progresso será reconhecido automaticamente.
          </motion.p>
        </motion.div>

      </div>
    </main>
  );
}
