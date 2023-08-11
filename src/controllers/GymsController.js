const Gym = require("../models/Gym")
const GymAddress = require("../models/GymAddress")
const Address = require("../models/Address")
const msg = require("../middlewares/msg")

const GymsController = {
  PostCreateGym(req, res) {
    const {
      name,
      description,
      addressName,
      cep,
      district,
      city,
      state,
      number,
      complement,
    } = req.body

    Gym.findOne({ where: { name: name } })
      .then((existingGym) => {
        if (existingGym) {
          res.status(409).json({ error: "Centro esportivo já foi criado." })
        } else {
          Gym.create({
            name: (name || "").toLowerCase(),
            description: (description || "").toLowerCase(),
          })
            .then((createdGym) => {
              Address.create({
                name: (addressName || "").toLowerCase(),
                cep,
                district: (district || "").toLowerCase(),
                city: (city || "").toLowerCase(),
                state: (state || "").toLowerCase(),
                number: (number || "").toLowerCase(),
                complement: (complement || "").toLowerCase(),
              })
                .then((createdAddress) => {
                  return GymAddress.create({
                    gymId: createdGym.id,
                    addressId: createdAddress.id,
                  })
                })
                .then(() => {
                  res
                    .status(200)
                    .json({ success: "Centro esportivo criado com sucesso." })
                })
                .catch((err) => {
                  res.status(500).json({
                    error: "Ocorreu um erro ao criar o centro esportivo.",
                  })
                })
            })
            .catch((err) => {
              res
                .status(500)
                .json({ error: "Ocorreu um erro ao criar o centro esportivo." })
            })
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "Ocorreu um erro ao criar o centro esportivo." })
      })
  },
  GetFindGyms(req, res) {
    Gym.findAll({})
      .then(async (gyms) => {
        const gymsWithAddresses = []
        if (gyms.length === 0) {
          res.status(200).json({
            notfound: "Não existem locais na base de dados",
          })
        } else {
          for (const gym of gyms) {
            const gymData = gym.toJSON()
            const address = await GymAddress.findOne({
              where: { gymId: gym.id },
            })

            if (address) {
              const addressData = await Address.findOne({
                where: { id: address.addressId },
              })
              if (addressData) {
                gymData.Address = addressData.toJSON()
              }
            }
            gymsWithAddresses.push(gymData)
          }

          res.status(200).json({
            gyms: gymsWithAddresses,
          })
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  },

  PostDeleteGym(req, res) {
    const id = req.body.id
    if (id != undefined) {
      if (!isNaN(id)) {
        Gym.destroy({
          where: {
            id: id,
          },
        }).then(() => {
          res
            .status(200)
            .json({ success: "Centro esportivo deletado com sucesso." })
        })
      } else {
        res.status(500).json({ error: "Centro esportivo criado com sucesso." })
      }
    } else {
      res
        .status(404)
        .json({ error: "Centro esportivo não encontrado para deletar." })
    }
  },
}
module.exports = GymsController
