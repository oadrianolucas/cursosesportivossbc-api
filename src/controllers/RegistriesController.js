const Registry = require("../models/Registry")
const User = require("../models/User")
const status = require("../middlewares/status")

const RegistriesController = {
  PostCreatedRegistry(req, res) {
    //Erro no if do status user
    const { cpf, rg, birth, userId, name, phone, sexy, sus } = req.body
    User.findByPk(userId).then((User) => {
      if (User != undefined) {
        console.log(User.status)
        if (User.status === 0) {
          if (birth > new Date() - 18) {
            console.log("O primeiro cadastro precisa ser maior de 18 anos")
            return res.json(status.error)
          }
        }
        Registry.findOne({ where: { cpf: cpf } }).then((Cpf) => {
          if (Cpf != undefined) {
            return res.json(status.error)
          }
        })
        Registry.findOne({ where: { rg: rg } }).then((Rg) => {
          if (Rg != undefined) {
            return res.json(status.error)
          }
        })
        Registry.create({
          name: (name || "").toLowerCase(),
          birth,
          phone,
          sexy: (sexy || "").toLowerCase(),
          cpf,
          rg,
          sus,
          userId,
        })
        User.update(
          {
            status: 1,
          },
          {
            where: {
              id: userId,
            },
          }
        )
        return res.json(status.success)
      } else {
        res.send("Usuário não enconstrato.")
      }
    })
  },
}

module.exports = RegistriesController
