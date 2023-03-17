const { json } = require("body-parser")
const mailer = require("nodemailer")
const status = require("./msg")

const userEmail = "kendrick.goyette71@ethereal.email"
const passwordEmail = "6ncyr4QptNwEgjjBC3"

const tranporter = mailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: userEmail,
    pass: passwordEmail,
  },
})

const nodemailer = {
  emailConfirm(email, token) {
    const message = {
      from: userEmail,
      to: email,
      subject:
        "Confirme sua conta no Cursos Esportivos de São Bernardo do Campo.",
      html: `
            <h4>Olá, seja bem-vindo ao Cursos Esportivos de São Bernardo do Campo!</h4>
            <p>Mas antes de realizar o primeiro acesso,
            esse é o código de ativação da sua conta:</p>
            <h2>${token}</h2>
            `,
    }
    tranporter.sendMail(message, (err) => {
      if (err) {
        json(err)
      } else {
        json(status.success)
      }
    })
  },
  emailResetPassword(email, token) {
    const message = {
      from: userEmail,
      to: email,
      subject: "Alterar Senha Cursos Esportivos de São Bernardo do Campo.",
      html: `
            <h4>Código de alterar senha: </h4>
            <h2>${token}</h2>
            `,
    }
    tranporter.sendMail(message, (err) => {
      if (err) {
        json(err)
      } else {
        json(status.success)
      }
    })
  },
}

module.exports = nodemailer
