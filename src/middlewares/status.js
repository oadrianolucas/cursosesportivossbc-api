const status = {
    error: {
        off: "off",
        e404: "404",
        email: "E-mail já esta cadastrado",
        email_password_confirm: "Conta ativa ou token inválido.",
        user_notfound: "E-mail não encontrado.",
        user_not_confirm_email: "E-mail não confirmado.",
        password_invalid: "Senha inválida.",
        login_notfound: "Efetue o login para ter o acesso.",
    },
    success: {
        on: "Seja bem-vindo a API dos Cursos Esportivos ",
        created_user: "Conta criada com sucesso, enviamos um e-mail para você ativar a conta, verifique o 'SPAM'.",
        email_password_confirm: "Parabéns, sua conta é ativa.",
        login: "Login efetuado com sucesso.",
    }
}

module.exports = status