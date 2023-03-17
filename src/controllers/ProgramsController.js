const Program = require("../models/Program")
const msg = require("../middlewares/msg")
const SeasonsController = {
  PostCreateProgram(req, res) {
    // Falta validar calculando o time e date para inicar o cadastro.
    const {
      name,
      description,
      status,
      startEnrollment,
      endEnrollment,
      startMatriculation,
      endMatriculation,
      seasonId,
    } = req.body
    Program.findOne({ where: { name: name } }).then((program) => {
      if (program != undefined) {
        res.json({ error: msg.error.create_program })
      } else {
        Program.create({
          name,
          description,
          status,
          startEnrollment,
          endEnrollment,
          startMatriculation,
          endMatriculation,
          seasonId,
        })
          .then(() => {
            res.json({ success: msg.success.create_program })
          })
          .cath((err) => {
            res.json({ error: err })
          })
      }
    })
  },
}

module.exports = SeasonsController
