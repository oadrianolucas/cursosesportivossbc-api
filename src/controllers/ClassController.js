const Class = require("../models/Class")
const msg = require("../middlewares/msg")
const ClassController = {
  PostCreateClass(req, res) {
    const {
      name,
      level,
      dayOne,
      dayTwo,
      startingAge,
      finalAge,
      sexy,
      amount,
      amountPcd,
      amountCid,
      amountCadUnico,
      description,
      gymId,
      modalityId,
    } = req.body
    Class.findOne({ where: { name: name } }).then((gym) => {
      if (gym != undefined) {
        res.json({ error: "turma já foi criado." })
      } else {
        Class.create({
          name: (name || "").toLowerCase(),
          level,
          dayOne,
          dayTwo,
          startingAge,
          finalAge,
          sexy,
          amount,
          amountPcd,
          amountCid,
          amountCadUnico,
          amountToken: 0,
          description: (description || "").toLowerCase(),
          gymId,
          modalityId,
        })
          .then(() => {
            res.json({ success: "turma criada com sucesso." })
          })
          .catch((err) => {
            res.json({ error: err })
          })
      }
    })
  },
}
module.exports = ClassController
