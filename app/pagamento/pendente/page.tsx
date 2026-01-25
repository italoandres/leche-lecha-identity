'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PagamentoPendentePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        <h1 className="text-2xl font-light text-foreground mb-6">
          Pagamento pendente
        </h1>
        
        <p className="text-foreground/70 font-light mb-8">
          Seu pagamento está sendo processado.<br />
          Você receberá um email quando for confirmado.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-300 font-light text-sm"
        >
          Voltar ao início
        </Link>
      </motion.div>
    </main>
  );
}
