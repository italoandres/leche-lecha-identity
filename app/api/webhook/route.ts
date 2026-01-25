import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { supabaseAdmin, upsertUserProgress } from '@/lib/supabase';

// Função para gerar senha aleatória
function generatePassword(length = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

// Função para enviar email com credenciais (placeholder - implementar com serviço de email)
async function sendCredentialsEmail(email: string, password: string) {
  // TODO: Implementar envio de email real
  console.log('📧 Email a ser enviado para:', email);
  console.log('🔑 Senha gerada:', password);
  console.log('📝 Instruções: Use estas credenciais para acessar o teste em /login');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Webhook recebido:', body);

    // Mercado Pago envia o tipo de notificação
    if (body.type === 'payment') {
      const paymentId = body.data.id;

      // Configurar cliente
      const client = new MercadoPagoConfig({ 
        accessToken: process.env.MP_ACCESS_TOKEN!,
      });

      const payment = new Payment(client);

      // Buscar informações do pagamento
      const paymentInfo = await payment.get({ id: paymentId });
      
      console.log('Status do pagamento:', paymentInfo.status);
      console.log('Email do comprador:', paymentInfo.payer?.email);

      if (paymentInfo.status === 'approved') {
        console.log('✅ Pagamento aprovado!');
        
        const email = paymentInfo.payer?.email;
        
        if (!email) {
          console.error('❌ Email do comprador não encontrado');
          return NextResponse.json({ error: 'Email não encontrado' }, { status: 400 });
        }

        // 1. Verificar se usuário já existe no Supabase
        const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
        const userExists = existingUser?.users.find(u => u.email === email);

        let userId: string;
        let password: string | null = null;

        if (userExists) {
          // Usuário já existe
          console.log('👤 Usuário já existe:', email);
          userId = userExists.id;
        } else {
          // Criar novo usuário
          console.log('🆕 Criando novo usuário:', email);
          password = generatePassword();

          const { data: newUser, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Confirmar email automaticamente
          });

          if (signUpError || !newUser.user) {
            console.error('❌ Erro ao criar usuário:', signUpError);
            throw signUpError;
          }

          userId = newUser.user.id;
          console.log('✅ Usuário criado com sucesso:', userId);

          // Enviar email com credenciais
          await sendCredentialsEmail(email, password);
        }

        // 2. Criar/atualizar registro em user_progress
        console.log('📝 Criando registro em user_progress...');
        await upsertUserProgress(userId);
        console.log('✅ Registro criado em user_progress');

        // 3. Se for novo usuário, enviar email com credenciais
        if (password) {
          console.log('📧 Credenciais enviadas para:', email);
        }

        return NextResponse.json({ 
          success: true,
          message: 'Pagamento processado e acesso liberado',
          newUser: !!password
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Erro no webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook', details: error.message },
      { status: 500 }
    );
  }
}
