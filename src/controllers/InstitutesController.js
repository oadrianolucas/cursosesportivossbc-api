const Institute = require("../models/Institute")
const msg = require("../middlewares/msg")

const InstitutesController = {
  PostCreateInstitute(req, res) {
    const { name, phone, description, responsible } = req.body
    Institute.findOne({ where: { name: name } }).then((institute) => {
      if (institute != undefined) {
        res.json({ error: "instituto já foi criado." })
      } else {
        Institute.create({
          name: (name || "").toLowerCase(),
          description: (description || "").toLowerCase(),
          phone,
          responsible,
        })
          .then(() => {
            res.json({ success: "instituto criada com sucesso." })
          })
          .catch((err) => {
            res.json({ error: err })
          })
      }
    })
  },
}
module.exports = InstitutesController
