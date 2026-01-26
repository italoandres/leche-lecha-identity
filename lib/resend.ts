import { Resend } from 'resend';

// Inicializar Resend com API Key (pode ser undefined durante build)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Email de boas-vindas ao ecossistema (após pagamento aprovado)
export async function sendWelcomeToEcosystemEmail(email: string, nome?: string) {
  // Verificar se Resend está configurado
  if (!resend) {
    console.warn('⚠️ Resend não configurado. Email não será enviado.');
    console.log('📧 Email que seria enviado para:', email);
    return null;
  }

  const greeting = nome ? `Olá, ${nome}` : 'Olá';

  try {
    const { data, error } = await resend.emails.send({
      from: 'Lech Lecha <onboarding@resend.dev>', // Mude para seu domínio quando configurar
      to: [email],
      subject: 'Seu acesso está liberado',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Georgia, serif;
                line-height: 1.8;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 40px 20px;
              }
              .content {
                padding: 20px 0;
              }
              .content p {
                margin: 20px 0;
                font-size: 16px;
                font-weight: 300;
              }
              .button {
                display: inline-block;
                padding: 15px 40px;
                background: #2c2c2c;
                color: #ffffff !important;
                text-decoration: none;
                font-size: 13px;
                letter-spacing: 1px;
                text-transform: uppercase;
                margin: 30px 0;
                font-weight: 300;
              }
              .signature {
                margin-top: 40px;
                padding-top: 30px;
                border-top: 1px solid #e0e0e0;
                font-size: 14px;
                color: #666;
                font-weight: 300;
              }
            </style>
          </head>
          <body>
            <div class="content">
              <p>${greeting},</p>
              
              <p>Seu pagamento foi confirmado.</p>
              
              <p>O que você acessou não é um produto.<br>É um espaço que continua.</p>
              
              <p>Você pode entrar usando o mesmo email e senha que criou no cadastro.</p>

              <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/bem-vindo" class="button">
                  Acessar agora
                </a>
              </div>

              <p>Algumas coisas não precisam ser explicadas.<br>Elas só precisam ser atravessadas.</p>

              <div class="signature">
                <p style="margin: 0;">— Lech Lecha</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Erro ao enviar email:', error);
      throw error;
    }

    console.log('✅ Email de boas-vindas enviado com sucesso:', data);
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
