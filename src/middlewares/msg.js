const status = {
  success: {
    welcome: "Bem-vindo à API de Cursos Esportivos.",
    createUser:
      "Conta criada com sucesso. Enviamos um e-mail para ativação da conta. Verifique a pasta 'SPAM'.",
    emailPasswordConfirm: "Parabéns, sua conta está ativa.",
    login: "Login efetuado com sucesso.",
    createRegistry: "Registro criado com sucesso.",
    createSeason: "Temporada criada com sucesso.",
    createProgram: "Programa criado com sucesso.",
    createAddress: "Endereço criado com sucesso.",
    createClass: "Turma criada com sucesso.",
    updateSubscription: "Inscrição atualizada com sucesso.",
    updateFilter: "Filtro alterado com sucesso.",
    createToken: "Token criado com sucesso.",
    createModality: "Modalidade criada com sucesso.",
    createInstitute: "Instituto criado com sucesso.",
    deleteInstitute: "Instituto deletado com sucesso.",
  },
  error: {
    off: "Desativado",
    e404: "Erro 404",
    emailExists: "E-mail já está cadastrado.",
    emailPasswordConfirm: "Conta inativa ou token inválido.",
    emailNotFound: "E-mail não encontrado.",
    unconfirmedEmail: "E-mail não confirmado.",
    invalidPassword: "Senha inválida.",
    loginRequired: "Faça login para acessar.",
    ageRequirement:
      "O primeiro registro deve ser feito por uma pessoa com 18 anos ou mais.",
    cpfExists: "CPF já cadastrado na plataforma.",
    invalidEmail: "E-mail inválido ou não encontrado.",
    seasonExists: "Ano de temporada já criado.",
    programExists: "Programa já existe.",
    userNotFound: "Usuário não encontrado.",
    createAddressError: "Erro ao criar endereço.",
    classExists: "Turma já foi criada.",
    registryNotFound: "Registro não encontrado.",
    registryNotBelongToUser: "Esse registro não pertence ao usuário.",
    modalityNotFound: "Modalidade não encontrada.",
    programNotFound: "Programa não encontrado.",
    seasonNotFound: "Temporada não encontrada.",
    gymNotFound: "Centro esportivo não encontrado.",
    sixMonthRestriction:
      "Não é possível criar uma nova inscrição por 6 meses devido à falta de participação em pelo menos 75% das aulas de um curso anterior. Lembre-se da importância de participar ativamente das aulas e se preparar para futuras oportunidades de matrícula. Agradecemos e desejamos sucesso.",
    subscriptionExists:
      "Já existe uma inscrição para essa modalidade e registro.",
    threeMonthRestriction:
      "Não é possível atualizar a inscrição, pois já existem 3 ou mais inscrições com status 'Inscrito' ou 'Matriculado'.",
    subscriptionExistsForModality:
      "Já existe uma inscrição com essa modalidade.",
    filterError: "Erro ao atualizar o filtro.",
    searchUserError: "Erro ao buscar o usuário.",
    instituteExists: "Instituto já foi criado.",
    createInstituteError: "Ocorreu um erro ao criar o instituto.",
    noInstitutesFound: "Não existem institutos na base de dados.",
    deleteInstituteError: "Ocorreu algum erro ao deletar instituto.",
  },
}

module.exports = status
