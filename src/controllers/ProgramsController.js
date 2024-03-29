const Program = require("../models/Program")
const msg = require("../middlewares/msg")

const SeasonsController = {
  PostCreateProgram(req, res) {
    const { name, description, seasonId, instituteId } = req.body
    Program.findOne({ where: { name: name } }).then((program) => {
      if (program != undefined) {
        res.json({ error: msg.error.createProgram })
      } else {
        Program.create({
          name: (name || "").toLowerCase(),
          description: (description || "").toLowerCase(),
          status: 1,
          seasonId,
          instituteId,
        })
          .then(() => {
            res.json({ success: msg.success.createProgram })
          })
          .catch((err) => {
            res.json({ error: err })
          })
      }
    })
  },
}

module.exports = SeasonsController
