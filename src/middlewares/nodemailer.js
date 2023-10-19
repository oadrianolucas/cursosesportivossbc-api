const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: '172.17.110.128',
  port: 1025,
  ignoreTLS: true,
});

const emailSender = {
  sendEmail(email, subject, content) {
    const message = {
      from: 'contato@cursosesportivossbc.com',
      to: email,
      subject: subject,
      html: content,
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error("Erro ao enviar e-mail:", err);
      } else {
        console.log("E-mail enviado com sucesso:", info.response);
      }
    });
  },

  emailConfirm(email, token) {
    const subject = "Confirme sua conta no Cursos Esportivos de São Bernardo do Campo.";
    const content = `
      <h2>Bem-vindo ao Cursos Esportivos de São Bernardo do Campo!</h2>
      <p>Parabéns por fazer parte da nossa comunidade de entusiastas de esportes.</p>
      <p>Antes de começarmos, é importante que você conclua o processo de ativação da sua conta. Para garantir que tudo corra bem, você precisará do seu código de ativação exclusivo. Este código foi enviado para o seu email registrado e se parece com isso:</p>
      <h2>${token}</h2>
      <p>Agora, aqui está o que você deve fazer:</p>
      <ol>
          <li>Acesse o seu email e encontre a mensagem de ativação enviada por nós.</li>
          <li>Copie o código de ativação e volte para o nosso site.</li>
          <li>Cole o código no campo apropriado durante o processo de primeiro acesso.</li>
          <li>Conclua as etapas restantes do processo de primeiro acesso e estará pronto para começar a explorar os nossos cursos esportivos e recursos incríveis.</li>
      </ol>
      <p>Lembre-se de que o seu código de ativação é pessoal e não deve ser compartilhado com outras pessoas. Ele é a chave para desbloquear todas as funcionalidades e benefícios da nossa plataforma.</p>
      <p>Se você enfrentar qualquer problema durante o processo de primeiro acesso ou precisar de assistência adicional, por favor, entre em contato com a nossa equipe de suporte. Estamos aqui para ajudar a tornar a sua experiência o mais tranquila possível.</p>
      <p>Desejamos a você muito sucesso em sua jornada esportiva conosco e esperamos que aproveite ao máximo tudo o que o Cursos Esportivos de São Bernardo do Campo tem a oferecer!</p>
      <p>Seja ativo, seja saudável, seja feliz!</p>
      <p>Atenciosamente, A Equipe do Cursos Esportivos de São Bernardo do Campo</p>
    `;
    this.sendEmail(email, subject, content);
  },

  emailResetPassword(email, password) {
    const subject = "Recuperação de Senha - Cursos Esportivos de São Bernardo do Campo";
    const content = `
      <h2>Senha de recuperação:</h2>
      <p>Para redefinir sua senha e continuar aproveitando todos os recursos do Cursos Esportivos de São Bernardo do Campo, utilize a senha de recuperação a seguir:</p>
      <h2>${password}</h2>
      <p>Se você não solicitou a redefinição de senha ou tiver alguma dúvida, entre em contato com nossa equipe de suporte imediatamente.</p>
      <p>Atenciosamente, A Equipe do Cursos Esportivos de São Bernardo do Campo</p>
    `;
    this.sendEmail(email, subject, content);
  },


};

module.exports = emailSender;
