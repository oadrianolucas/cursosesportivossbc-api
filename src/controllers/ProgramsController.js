const Program = require("../models/Program")
const msg = require("../middlewares/msg")
const moment = require("moment")
const SeasonsController = {
  PostCreateProgram(req, res) {
    const {
      name,
      description,
      hourEnrollment,
      dateEnrollment,
      hourtMatriculation,
      dateMatriculation,
      seasonId,
    } = req.body
    const datehourEnrollment = moment(
      `${dateEnrollment} ${hourEnrollment}`,
      "YYYY-MM-DD HH:mm:ss"
    ).format("DD/MM/YYYY HH:mm:ss")
    const datehourMatriculation = moment(
      `${dateMatriculation} ${hourtMatriculation}`,
      "YYYY-MM-DD HH:mm:ss"
    ).format("DD/MM/YYYY HH:mm:ss")

    Program.findOne({ where: { name: name } }).then((program) => {
      if (program != undefined) {
        res.json({ error: msg.error.create_program })
      } else {
        Program.create({
          name,
          description,
          status: 1,
          datehourEnrollment,
          datehourMatriculation,
          seasonId,
        })
          .then(() => {
            res.json({ success: msg.success.create_program })
          })
          .catch((err) => {
            res.json({ error: err })
          })
      }
    })
  },
}

module.exports = SeasonsController
