import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendWelcomeToEcosystemEmail } from '@/lib/resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Webhook Hotmart recebido:', JSON.stringify(body, null, 2));

    // Verificar se é evento de compra aprovada
    if (body.event !== 'PURCHASE_COMPLETE') {
      console.log(`Evento ignorado: ${body.event}`);
      return NextResponse.json({ received: true });
    }

    const { data } = body;
    const buyerEmail = data.buyer.email;
    const buyerName = data.buyer.name;

    console.log(`Processando compra para: ${buyerEmail}`);

    // Buscar usuário no Supabase
    const { data: authData } = await supabase.auth.admin.listUsers();
    const user = authData.users.find(u => u.email === buyerEmail);

    if (!user) {
      console.error(`Usuário não encontrado: ${buyerEmail}`);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Liberar acesso adicionando "identidade_negociada" em completed_chapter_ids
    const { error: updateError } = await supabase
      .from('user_progress')
      .update({
        completed_chapter_ids: ['identidade_negociada'],
        last_updated: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Erro ao liberar acesso:', updateError);
      return NextResponse.json({ error: 'Failed to grant access' }, { status: 500 });
    }

    console.log(`Acesso liberado para: ${buyerEmail}`);

    // Enviar email de boas-vindas
    try {
      await sendWelcomeToEcosystemEmail(buyerEmail, buyerName);
      console.log(`Email enviado para: ${buyerEmail}`);
    } catch (emailError) {
      console.error('Erro ao enviar email:', emailError);
      // Não falhar o webhook se o email falhar
    }

    // Disparar evento Meta Pixel Purchase
    console.log('Meta Pixel Purchase event should be triggered on client side');

    return NextResponse.json({ 
      success: true,
      message: 'Access granted and email sent'
    });

  } catch (error: any) {
    console.error('Erro no webhook Hotmart:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed', details: error.message },
      { status: 500 }
    );
  }
}
