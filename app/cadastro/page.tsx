'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

// Declaração de tipo para o Facebook Pixel
declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: any) => void;
  }
}

export default function CadastroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (email !== confirmarEmail) {
      setError('Os emails não coincidem');
      return;
    }

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    if (senha.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      // Criar usuário no Supabase
      await signUp(email, senha);

      // Aguardar um pouco para garantir que o usuário foi criado
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Buscar o usuário recém-criado
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Criar registro em user_progress
        await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            nome: nome,
            whatsapp: whatsapp,
            journey_entry_point: 'web_identidade_negociada',
            onboarding_complete: false,
            completed_chapter_ids: [],
            unlocked_piece_indices: [],
            reflections: {},
            video_positions: {},
            last_updated: new Date().toISOString()
          }, {
            onConflict: 'user_id'
          });

        // Disparar evento de conversão do Meta Pixel
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'CompleteRegistration');
          console.log('Meta Pixel: CompleteRegistration event tracked');
        }
      }

      // Redirecionar para o resultado (não mais para /teste)
      router.push('/resultado');
    } catch (err: any) {
      console.error('Erro no cadastro:', err);
      if (err.message.includes('already registered')) {
        setError('Este email já está cadastrado. Faça login.');
      } else {
        setError('Erro ao criar cadastro. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-2xl md:text-3xl font-light text-foreground/90 mb-4 leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Crie sua conta para ver o resultado
          </h1>
          <p className="text-foreground/60 font-light text-sm leading-relaxed">
            Seu resultado será apresentado de forma interpretativa e contextual.
            <br />
            O acesso garante continuidade, privacidade e profundidade.
          </p>
        </motion.div>

        {/* Micro-âncora psicológica */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8 text-center"
        >
          <p className="text-foreground/50 text-xs font-light leading-relaxed">
            Você já respondeu o teste.
            <br />
            Agora crie sua conta para acessar o resultado completo.
          </p>
        </motion.div>

        {/* Formulário */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Nome */}
          <div>
            <label 
              htmlFor="nome" 
              className="block text-sm font-light text-foreground/70 mb-2"
            >
              Nome
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-foreground/20 text-foreground focus:outline-none focus:border-foreground/40 transition-colors font-light"
              placeholder="Seu nome"
            />
          </div>

          {/* Email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-light text-foreground/70 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-foreground/20 text-foreground focus:outline-none focus:border-foreground/40 transition-colors font-light"
              placeholder="seu@email.com"
            />
          </div>

          {/* Confirmar Email */}
          <div>
            <label 
              htmlFor="confirmar-email" 
              className="block text-sm font-light text-foreground/70 mb-2"
            >
              Confirmar email
            </label>
            <input
              id="confirmar-email"
              type="email"
              value={confirmarEmail}
              onChange={(e) => setConfirmarEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-foreground/20 text-foreground focus:outline-none focus:border-foreground/40 transition-colors font-light"
              placeholder="seu@email.com"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label 
              htmlFor="whatsapp" 
              className="block text-sm font-light text-foreground/70 mb-2"
            >
              WhatsApp
            </label>
            <input
              id="whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-foreground/20 text-foreground focus:outline-none focus:border-foreground/40 transition-colors font-light"
              placeholder="(00) 00000-0000"
            />
            <p className="text-foreground/50 text-xs font-light mt-2 leading-relaxed">
              Usamos o WhatsApp apenas para comunicações essenciais do projeto Lech Lecha.
              <br />
              Sem spam. Sem exposição.
            </p>
          </div>

          {/* Senha */}
          <div>
            <label 
              htmlFor="senha" 
              className="block text-sm font-light text-foreground/70 mb-2"
            >
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-background border border-foreground/20 text-foreground focus:outline-none focus:border-foreground/40 transition-colors font-light"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {/* Confirmar Senha */}
          <div>
            <label 
              htmlFor="confirmar-senha" 
              className="block text-sm font-light text-foreground/70 mb-2"
            >
              Confirmar senha
            </label>
            <input
              id="confirmar-senha"
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-background border border-foreground/20 text-foreground focus:outline-none focus:border-foreground/40 transition-colors font-light"
              placeholder="Repita a senha"
            />
          </div>

          {/* Erro */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm font-light text-center"
            >
              {error}
            </motion.p>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 border border-foreground/20 text-foreground/80 hover:bg-foreground/5 font-light text-sm tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            {loading ? 'Criando acesso...' : 'Criar conta e ver resultado'}
          </button>

          {/* Texto secundário */}
          <p className="text-foreground/50 text-xs font-light text-center mt-4 leading-relaxed">
            Ao criar o acesso, você entra no ecossistema Lech Lecha
            <br />
            e poderá continuar sua jornada quando quiser.
          </p>
        </motion.form>

        {/* Link para login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-foreground/50 text-sm font-light">
            Já tem uma conta?{' '}
            <a 
              href="/login" 
              className="text-foreground/70 hover:text-foreground transition-colors underline"
            >
              Fazer login
            </a>
          </p>
        </motion.div>

      </div>
    </main>
  );
}
