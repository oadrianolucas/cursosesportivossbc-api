const Gym = require("../models/Gym")
const msg = require("../middlewares/msg")

const GymsController = {
  PostCreatedGym(req, res) {
    const { name } = req.body
    Gym.findOne({ where: { name: name } }).then((gym) => {
      if (gym != undefined) {
        res.json({ error: "centro esportivo já foi criado." })
      } else {
        Gym.create({
          name: (name || "").toLowerCase(),
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
