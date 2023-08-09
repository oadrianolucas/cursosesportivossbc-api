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
    const page = req.query.page ? parseInt(req.query.page) : 1
    const pageSize = 10

    Gym.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    })
      .then(async (result) => {
        const pageCount = Math.ceil(result.count / pageSize)
        const gyms = result.rows
        const gymsWithAddresses = []

        if (result.count === 0) {
          res.status(200).json({
            notfound: "Não existem academias na base de dados",
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
            totalPages: pageCount,
            currentPage: page,
          })
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  },
}
module.exports = GymsController
