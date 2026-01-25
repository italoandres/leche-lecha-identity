'use client';

import { Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

// Declaração de tipo para o Facebook Pixel
declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: any) => void;
  }
}

// Componente que usa useSearchParams
function PurchaseTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Verificar se veio do fluxo de pagamento
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    
    // Só disparar o evento se tiver parâmetros de pagamento válidos
    if ((paymentId || status === 'approved') && typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', {
        value: 29.90,
        currency: 'BRL'
      });
      console.log('Meta Pixel: Purchase event tracked - R$ 29,90');
    }
  }, [searchParams]);

  return null;
}

export default function PagamentoSucessoPage() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/leitura');
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Rastreamento de conversão */}
      <Suspense fallback={null}>
        <PurchaseTracker />
      </Suspense>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="text-center max-w-lg"
      >
        {/* Texto principal */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
          className="text-3xl font-light text-foreground mb-12 tracking-wide"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Acesso liberado.
        </motion.h1>

        {/* Subtexto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.2, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="text-foreground/70 font-light leading-relaxed text-lg">
            Este não é um produto.
          </p>
          <p className="text-foreground/70 font-light leading-relaxed text-lg">
            É um espaço de escuta.
          </p>
        </motion.div>

        {/* Botão */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.2, ease: 'easeOut' }}
        >
          <button
            onClick={handleEnter}
            className="px-16 py-4 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-500 font-light tracking-widest text-sm uppercase"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Entrar
          </button>
        </motion.div>

        {/* Espaço em branco intencional */}
        <div className="h-24"></div>
      </motion.div>
    </main>
  );
}
