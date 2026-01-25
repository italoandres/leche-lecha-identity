import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Configurar cliente do Mercado Pago (nova sintaxe)
    const client = new MercadoPagoConfig({ 
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });

    const preference = new Preference(client);

    const preferenceData = {
      items: [
        {
          id: 'leitura-personalizada',
          title: 'Leitura Personalizada - Narcisismo Materno',
          description: 'Análise completa e leitura personalizada baseada no diagnóstico',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 29.90,
        },
      ],
      payer: {
        email: email || 'comprador@email.com',
        name: name || 'Comprador',
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/pagamento/sucesso`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/pagamento/falha`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pagamento/pendente`,
      },
      statement_descriptor: 'LECH LECHA',
      external_reference: `order_${Date.now()}`,
    };

    console.log('Criando preferência com:', JSON.stringify(preferenceData, null, 2));

    // Criar preferência de pagamento
    const result = await preference.create({
      body: preferenceData
    });

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
    });
  } catch (error: any) {
    console.error('Erro ao criar preferência:', error);
    return NextResponse.json(
      { error: 'Erro ao criar pagamento', details: error.message },
      { status: 500 }
    );
  }
}
