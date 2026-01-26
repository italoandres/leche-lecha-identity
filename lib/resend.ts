import { Resend } from 'resend';

// Inicializar Resend com API Key (pode ser undefined durante build)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Email de boas-vindas após pagamento aprovado
export async function sendWelcomeEmail(email: string, password: string) {
  // Verificar se Resend está configurado
  if (!resend) {
    console.warn('⚠️ Resend não configurado. Email não será enviado.');
    console.log('📧 Email que seria enviado para:', email);
    console.log('🔑 Senha gerada:', password);
    return null;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Lech Lecha <onboarding@resend.dev>', // Mude para seu domínio quando configurar
      to: [email],
      subject: '🎉 Bem-vindo ao Lech Lecha - Seu acesso está liberado!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Georgia, serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                text-align: center;
                padding: 30px 0;
                border-bottom: 1px solid #e0e0e0;
              }
              .header h1 {
                font-size: 24px;
                font-weight: 300;
                margin: 0;
                color: #2c2c2c;
              }
              .content {
                padding: 30px 0;
              }
              .credentials {
                background: #f9f9f9;
                border-left: 3px solid #2c2c2c;
                padding: 20px;
                margin: 20px 0;
              }
              .credentials h2 {
                font-size: 16px;
                font-weight: 500;
                margin-top: 0;
                color: #2c2c2c;
              }
              .credentials p {
                margin: 10px 0;
                font-family: 'Courier New', monospace;
              }
              .button {
                display: inline-block;
                padding: 15px 40px;
                background: #2c2c2c;
                color: #ffffff !important;
                text-decoration: none;
                font-size: 14px;
                letter-spacing: 1px;
                text-transform: uppercase;
                margin: 20px 0;
              }
              .steps {
                background: #f9f9f9;
                padding: 20px;
                margin: 20px 0;
              }
              .steps ol {
                margin: 10px 0;
                padding-left: 20px;
              }
              .steps li {
                margin: 10px 0;
              }
              .footer {
                text-align: center;
                padding: 30px 0;
                border-top: 1px solid #e0e0e0;
                font-size: 12px;
                color: #999;
              }
              .important {
                background: #fff3cd;
                border-left: 3px solid #ffc107;
                padding: 15px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Lech Lecha</h1>
              <p style="font-size: 14px; color: #666; margin-top: 10px;">Identidade Negociada</p>
            </div>

            <div class="content">
              <p>Olá,</p>
              
              <p>Seu pagamento foi confirmado com sucesso! 🎉</p>
              
              <p>Agora você tem acesso completo à sua leitura personalizada sobre <strong>Identidade Negociada</strong>.</p>

              <div class="credentials">
                <h2>🔐 SUAS CREDENCIAIS DE ACESSO</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Senha:</strong> ${password}</p>
              </div>

              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/login" class="button">
                  Acessar Agora
                </a>
              </div>

              <div class="steps">
                <h2 style="font-size: 16px; margin-top: 0;">📖 COMO ACESSAR:</h2>
                <ol>
                  <li>Clique no botão acima ou acesse: <a href="${process.env.NEXT_PUBLIC_BASE_URL}/login">${process.env.NEXT_PUBLIC_BASE_URL}/login</a></li>
                  <li>Faça login com suas credenciais</li>
                  <li>Explore sua leitura personalizada</li>
                </ol>
              </div>

              <div class="important">
                <p style="margin: 0;"><strong>💡 IMPORTANTE:</strong> Salve este email para não perder suas credenciais de acesso.</p>
              </div>

              <p style="margin-top: 30px;">Este não é um produto. É um espaço de escuta.</p>
              
              <p>Qualquer dúvida, responda este email que estamos à disposição.</p>
              
              <p style="margin-top: 30px;">Abraços,<br><strong>Equipe Lech Lecha</strong></p>
            </div>

            <div class="footer">
              <p>Você está recebendo este email porque completou uma compra no Lech Lecha.</p>
              <p>© ${new Date().getFullYear()} Lech Lecha. Todos os direitos reservados.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Erro ao enviar email:', error);
      throw error;
    }

    console.log('✅ Email enviado com sucesso:', data);
    return data;
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    throw error;
  }
}

// Email de recuperação de acesso (para usar manualmente ou em API futura)
export async function sendPasswordResetEmail(email: string, resetLink: string) {
  // Verificar se Resend está configurado
  if (!resend) {
    console.warn('⚠️ Resend não configurado. Email não será enviado.');
    return null;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Lech Lecha <onboarding@resend.dev>',
      to: [email],
      subject: '🔑 Recuperação de Acesso - Lech Lecha',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Georgia, serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                text-align: center;
                padding: 30px 0;
                border-bottom: 1px solid #e0e0e0;
              }
              .button {
                display: inline-block;
                padding: 15px 40px;
                background: #2c2c2c;
                color: #ffffff !important;
                text-decoration: none;
                font-size: 14px;
                letter-spacing: 1px;
                text-transform: uppercase;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                padding: 30px 0;
                border-top: 1px solid #e0e0e0;
                font-size: 12px;
                color: #999;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Lech Lecha</h1>
            </div>

            <div class="content">
              <p>Olá,</p>
              
              <p>Recebemos uma solicitação para recuperar seu acesso ao Lech Lecha.</p>
              
              <p>Clique no botão abaixo para criar uma nova senha:</p>

              <div style="text-align: center;">
                <a href="${resetLink}" class="button">
                  Criar Nova Senha
                </a>
              </div>

              <p>Ou copie e cole este link no navegador:</p>
              <p style="word-break: break-all; color: #666;">${resetLink}</p>

              <p style="margin-top: 30px;"><strong>Se você não solicitou esta recuperação, ignore este email.</strong></p>
              
              <p>Abraços,<br><strong>Equipe Lech Lecha</strong></p>
            </div>

            <div class="footer">
              <p>© ${new Date().getFullYear()} Lech Lecha. Todos os direitos reservados.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Erro ao enviar email de recuperação:', error);
      throw error;
    }

    console.log('✅ Email de recuperação enviado:', data);
    return data;
  } catch (error) {
    console.error('❌ Erro ao enviar email de recuperação:', error);
    throw error;
  }
}
