'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CheckoutPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    if (!email || !name) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Criar preferência de pagamento
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar pagamento');
      }

      const data = await response.json();

      // Redirecionar para página de pagamento do Mercado Pago
      window.location.href = data.init_point;
    } catch (err: any) {
      console.error('Erro:', err);
      setError('Não foi possível processar o pagamento. Tente novamente.');
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-2xl font-light text-foreground mb-2 tracking-wide">
            Acesso
          </h1>
          <p className="text-sm text-muted/60 font-light">
            Identidade Negociada
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-secondary/30 border border-foreground/10 p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-foreground/10">
            <span className="text-foreground/80 font-light">Material digital</span>
            <span className="text-foreground font-light">R$ 29,90</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-foreground font-light">Total</span>
            <span className="text-foreground text-xl font-light">R$ 29,90</span>
          </div>
        </motion.div>

        {/* Formulário */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-4 mb-8"
        >
          <div>
            <label className="block text-foreground/70 text-sm font-light mb-2">
              Nome completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full px-4 py-3 bg-secondary/30 border border-foreground/10 text-foreground font-light focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-foreground/70 text-sm font-light mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-secondary/30 border border-foreground/10 text-foreground font-light focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Erro */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-light text-center">
            {error}
          </div>
        )}

        {/* Botão */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-center"
        >
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className={`
              w-full px-12 py-4 border border-foreground/20 text-foreground 
              hover:bg-foreground/5 transition-all duration-300 font-light 
              tracking-wide text-sm
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isProcessing ? 'Processando...' : 'Ir para pagamento'}
          </button>
          
          <p className="text-muted/60 text-xs font-light mt-6">
            Você será redirecionado para o Mercado Pago
          </p>
        </motion.div>

      </div>
    </main>
  );
}
