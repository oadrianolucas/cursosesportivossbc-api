const Gym = require("../models/Gym")
const GymAddress = require("../models/GymAddress")
const Address = require("../models/Address")

const msg = require("../middlewares/msg")
const GymsController = {
  PostCreateGym(req, res) {
    const { name, description } = req.body
    Gym.findOne({ where: { name: name } }).then((gym) => {
      if (gym != undefined) {
        res.json({ error: "centro esportivo já foi criado." })
      } else {
        Gym.create({
          name: (name || "").toLowerCase(),
          description: (description || "").toLowerCase(),
        })
          .then(() => {
            res.json({ success: "centro esportivo criado com sucesso." })
          })
          .catch((err) => {
            res.json({ error: err })
          })
      }
    })
  },
  PostCreateGymAddress(req, res) {
    const { name, description } = req.body
    Gym.findOne({ where: { name: name } }).then((gym) => {
      if (gym != undefined) {
        res.json({ error: "centro esportivo já foi criado." })
      } else {
        Gym.create({
          name: (name || "").toLowerCase(),
          description: (description || "").toLowerCase(),
        })
          .then(() => {
            res.json({ success: "centro esportivo criado com sucesso." })
          })
          .catch((err) => {
            res.json({ error: err })
          })
      }
    })
  },
}
module.exports = GymsController
