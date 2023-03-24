const Registry = require("../models/Registry")
const User = require("../models/User")
const msg = require("../middlewares/msg")
const RegistriesController = {
  PostCreatedRegistry(req, res) {
    const { cpf, birth, userId, name, phone, sexy, sus, pcd, cadUnico } =
      req.body
    Registry.findOne({ where: { cpf: cpf } }).then((registry) => {
      if (registry != undefined) {
        res.json({ error: msg.error.cpf_found })
      } else {
        User.findByPk(userId).then((user) => {
          if (user != undefined) {
            if (user.status == 0) {
              const partesData = birth.split("/")
              const dataNascimento = new Date(
                partesData[2],
                partesData[1] - 1,
                partesData[0]
              )
              const idadeEmMilissegundos = new Date() - dataNascimento
              const idadeEmAnos =
                idadeEmMilissegundos / (365.25 * 24 * 60 * 60 * 1000)
              if (idadeEmAnos < 18) {
                res.json({ error: msg.error.biggerorequal18 })
              } else {
                Registry.create({
                  name: (name || "").toLowerCase(),
                  birth,
                  phone,
                  sexy: (sexy || "").toLowerCase(),
                  cpf,
                  sus,
                  pcd,
                  cadUnico,
                  userId,
                })
                  .then(() => {
                    res.json({ success: msg.success.create_registry })
                  })
                  .catch((err) => {
                    res.json({ error: err })
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
                  .then()
                  .catch((err) => {
                    res.json({ error: err })
                  })
              }
            } else {
              Registry.create({
                name: (name || "").toLowerCase(),
                birth,
                phone,
                sexy: (sexy || "").toLowerCase(),
                cpf,
                sus,
                pcd,
                cadUnico,
                userId,
              })
                .then(() => {
                  res.json({ success: msg.success.create_registry })
                })
                .catch((err) => {
                  res.json({ error: err })
                })
            }
          } else {
            res.json({ error: msg.error.user_not_found })
          }
        })
      }
    })
  },
}

module.exports = RegistriesController
