const Modality = require("../models/Modality")
const msg = require("../middlewares/msg")

const ModalityController = {
  PostCreateModality(req, res) {
    const { name, description } = req.body
    Modality.findOne({ where: { name: name } }).then((gym) => {
      if (gym) {
        res.status(409).json({ error: "Modalidade já foi criada." })
      } else {
        Modality.create({
          name: (name || "").toLowerCase(),
          description: (description || "").toLowerCase(),
        })
          .then(() => {
            res.status(200).json({ success: "Modalidade criada com sucesso." })
          })
          .catch((err) => {
            res.status(500).json({ error: err })
          })
      }
    })
  },
  GetFindModalities(req, res) {
    Modality.findAll()
      .then((result) => {
        if (result.length === 0) {
          res.status(200).json({
            notfound: "Não existem modalidades na base de dados",
          })
        } else {
          res.status(200).json({
            modalities: result.map((modality) => modality.toJSON()),
          })
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  },
}
module.exports = ModalityController
