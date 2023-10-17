const Season = require("../models/Season")
const msg = require("../middlewares/msg")

const SeasonsController = {
  PostCreateSeason(req, res) {
    const { year } = req.body
    Season.findOne({ where: { year: year } }).then((season) => {
      if (season != undefined) {
        res.json({ error: msg.error.createSeason })
      } else {
        Season.create({
          year,
        })
          .then(() => {
            res.json({ success: msg.success.createSeason })
          })
          .catch((err) => {
            res.json({ error: err })
          })
      }
    })
  },
}

module.exports = SeasonsController
