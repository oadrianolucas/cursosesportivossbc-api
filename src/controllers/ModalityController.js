const Modality = require("../models/Modality")
const msg = require("../middlewares/msg")

const ModalityController = {
  PostCreateModality(req, res) {
    const { name, description, programId } = req.body
    Modality.findOne({ where: { name: name } }).then((gym) => {
      if (gym != undefined) {
        res.json({ error: "modalidade já foi criado." })
      } else {
        Modality.create({
          name: (name || "").toLowerCase(),
          description: (description || "").toLowerCase(),
          programId,
        })
          .then(() => {
            res.json({ success: "modalidade criada com sucesso." })
          })
          .catch((err) => {
            res.json({ error: err })
          })
      }
    })
  },
}
module.exports = ModalityController
