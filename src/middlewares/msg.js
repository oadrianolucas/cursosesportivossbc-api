const status = {
  success: {
    on: "Seja bem-vindo a API dos Cursos Esportivos.",
    create_user:
      "Conta criada com sucesso, enviamos um e-mail para você ativar a conta, verifique o 'SPAM'.",
    email_password_confirm: "Parabéns, sua conta esta ativa.",
    login: "Login efetuado com sucesso.",
    create_registry: "Registro criado com sucesso.",
    create_season: "Temporada criada com sucesso.",
    create_program: "Programa criado com sucesso.",
  },
  error: {
    off: "off",
    e404: "404",
    email: "E-mail já esta cadastrado.",
    email_password_confirm: "Conta ativa ou token inválido.",
    email_user_notfound: "E-mail não encontrado.",
    user_not_confirm_email: "E-mail não confirmado.",
    password_invalid: "Senha inválida.",
    login_notfound: "Efetue o login para ter o acesso.",
    biggerorequal18:
      "O primeiro registro deve ser feito por uma pessoa com idade igual ou superior a 18 anos.",
    cpf_found: "Cpf já cadastrado na plataforma.",
    user_not_found: "E-mail inválido ou não encontrado.",
    create_season: "Ano de temporada já está criado.",
    create_program: "Programa já existe.",
  },
}

module.exports = status
