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
      subject: '🎉 Bem-vindo ao ecossistema Lech Lecha',
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
              .highlight-box {
                background: #f9f9f9;
                border-left: 3px solid #2c2c2c;
                padding: 20px;
                margin: 20px 0;
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
              .section {
                margin: 30px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Lech Lecha</h1>
              <p style="font-size: 14px; color: #666; margin-top: 10px;">Identidade Negociada</p>
            </div>

            <div class="content">
              <p>${greeting},</p>
              
              <p>Seu pagamento foi confirmado com sucesso! 🎉</p>
              
              <p>Você não comprou um produto. Você entrou em um <strong>espaço de escuta, reflexão e continuidade</strong>.</p>

              <div class="highlight-box">
                <h2 style="font-size: 16px; font-weight: 500; margin-top: 0; color: #2c2c2c;">
                  🔐 SUAS CREDENCIAIS
                </h2>
                <p>Use as mesmas credenciais que você criou no cadastro inicial:</p>
                <p><strong>Email:</strong> ${email}</p>
                <p style="margin-top: 15px; font-size: 14px; color: #666;">
                  Se você esqueceu sua senha, pode recuperá-la na página de login.
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/bem-vindo" class="button">
                  Começar Agora
                </a>
              </div>

              <div class="section">
                <h2 style="font-size: 18px; font-weight: 300; color: #2c2c2c; margin-bottom: 15px;">
                  O que te espera
                </h2>
                
                <p><strong>📖 Sua leitura personalizada</strong></p>
                <p style="margin-left: 20px; color: #666;">
                  Uma análise profunda sobre <em>Identidade Negociada</em> — o processo silencioso de adaptação emocional 
                  que molda quem você se tornou. Não é sobre rotular ninguém. É sobre entender os papéis emocionais 
                  que você aprendeu a desempenhar.
                </p>

                <p style="margin-top: 20px;"><strong>📱 App Lech Lecha (Comece pela Raiz)</strong></p>
                <p style="margin-left: 20px; color: #666;">
                  Um aplicativo de reflexão diária que te ajuda a reconhecer padrões emocionais antes que eles se repitam. 
                  Gratuito para membros do ecossistema.
                </p>

                <p style="margin-top: 20px;"><strong>👥 Comunidade</strong></p>
                <p style="margin-left: 20px; color: #666;">
                  Você faz parte de um espaço para quem busca clareza, não respostas prontas. 
                  Para quem quer entender, não apenas reagir.
                </p>
              </div>

              <div class="highlight-box" style="background: #f0f9ff; border-left-color: #0284c7;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>💡 Próximo passo:</strong> Clique no botão acima para acessar sua página de boas-vindas 
                  e conhecer tudo que está disponível para você.
                </p>
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
