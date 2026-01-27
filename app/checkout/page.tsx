'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{ nome: string; email: string } | null>(null);

  useEffect(() => {
    async function loadUserData() {
      if (!user) {
        router.push('/login');
        return;
      }

      // Buscar dados do usuário
      const { data } = await supabase
        .from('user_progress')
        .select('nome')
        .eq('user_id', user.id)
        .single();

      setUserData({
        nome: data?.nome || '',
        email: user.email || '',
      });
      setLoading(false);
    }

    loadUserData();
  }, [user, router]);

  const handleCheckout = () => {
    if (!userData) return;

    // Link da Hotmart com dados pré-populados
    const hotmartLink = `https://pay.hotmart.com/U104102596N?name=${encodeURIComponent(userData.nome)}&email=${encodeURIComponent(userData.email)}`;
    
    // Redirecionar para Hotmart
    window.location.href = hotmartLink;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground/70 font-light">Carregando...</p>
      </main>
    );
  }

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
            <span className="text-foreground/80 font-light">Leitura Personalizada</span>
            <span className="text-foreground font-light">$7.50</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-foreground font-light">Total</span>
            <span className="text-foreground text-xl font-light">$7.50</span>
          </div>
        </motion.div>

        {/* Informações do usuário */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8 p-6 bg-secondary/20 border border-foreground/10"
        >
          <p className="text-foreground/70 text-sm font-light mb-2">
            Comprando como:
          </p>
          <p className="text-foreground font-light">{userData?.nome}</p>
          <p className="text-foreground/60 text-sm font-light">{userData?.email}</p>
        </motion.div>

        {/* Botão */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-center"
        >
          <button
            onClick={handleCheckout}
            className="w-full px-12 py-4 border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all duration-300 font-light tracking-wide text-sm"
          >
            Continuar para Pagamento
          </button>
          
          <p className="text-muted/60 text-xs font-light mt-6">
            Checkout seguro via Hotmart
          </p>
        </motion.div>

      </div>
    </main>
  );
}
