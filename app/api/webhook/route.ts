import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { supabaseAdmin, upsertUserProgress } from '@/lib/supabase';
import { sendWelcomeToEcosystemEmail } from '@/lib/resend';

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

        // 1. Buscar usuário existente (100% dos casos o usuário já existe)
        const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
        const user = existingUser?.users.find((u: any) => u.email === email);

        if (!user) {
          console.error('❌ Usuário não encontrado. Isso não deveria acontecer.');
          return NextResponse.json({ 
            error: 'Usuário não encontrado. Entre em contato com o suporte.' 
          }, { status: 400 });
        }

        console.log('👤 Usuário encontrado:', email);
        const userId = user.id;

        // 2. Criar/atualizar registro em user_progress
        console.log('📝 Criando registro em user_progress...');
        await upsertUserProgress(userId);
        console.log('✅ Registro criado em user_progress');

        // 3. Enviar email de boas-vindas ao ecossistema (sem senha)
        try {
          await sendWelcomeToEcosystemEmail(email);
          console.log('✅ Email de boas-vindas enviado para:', email);
        } catch (emailError) {
          console.error('❌ Erro ao enviar email:', emailError);
          // Não falhar o webhook se o email falhar
          // O acesso foi liberado com sucesso, só o email que não foi
        }

        return NextResponse.json({ 
          success: true,
          message: 'Pagamento processado e acesso liberado'
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
