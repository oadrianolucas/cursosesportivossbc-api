const Gym = require("../models/Gym")
const GymAddress = require("../models/GymAddress")
const Address = require("../models/Address")
const msg = require("../middlewares/msg") // Importe o módulo com as mensagens de erro e sucesso

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
          res.status(409).json({ error: msg.error.duplicateGym })
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
                  res.status(200).json({ success: msg.success.createGym })
                })
                .catch((err) => {
                  res.status(500).json({
                    error: msg.error.createGymError,
                  })
                })
            })
            .catch((err) => {
              res.status(500).json({ error: msg.error.createGymError })
            })
        }
      })
      .catch((err) => {
        res.status(500).json({ error: msg.error.createGymError })
      })
  },

  GetFindGyms(req, res) {
    Gym.findAll({})
      .then(async (gyms) => {
        const gymsWithAddresses = []
        if (gyms.length === 0) {
          res.status(200).json({
            notfound: msg.error.noGymsFound,
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
        res.status(500).json({ error: msg.error.findGymsError })
      })
  },
}

module.exports = GymsController
