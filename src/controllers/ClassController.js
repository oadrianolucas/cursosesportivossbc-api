const Class = require("../models/Class")
const SchoolCall = require("../models/SchoolCall")
const msg = require("../middlewares/msg")

const moment = require("moment")
const ClassController = {
  PostCreateClass(req, res) {
    const {
      name,
      level,
      period,
      hour,
      dayOption,
      startingAge,
      finalAge,
      sexy,
      amount,
      amountPcd,
      amountCid,
      amountCadUnico,
      description,
      dateEnrollment,
      hourEnrollment,
      dateMatriculation,
      hourMatriculation,
      gymId,
      modalityId,
    } = req.body
    Class.findOne({ where: { name: name } }).then((gym) => {
      if (gym != undefined) {
        res.json({ error: msg.error.classExists })
      } else {
        const datehourEnrollment = moment(
          `${dateEnrollment} ${hourEnrollment}`,
          "YYYY-MM-DD HH:mm:ss"
        ).format("DD/MM/YYYY HH:mm:ss")
        const datehourMatriculation = moment(
          `${dateMatriculation} ${hourMatriculation}`,
          "YYYY-MM-DD HH:mm:ss"
        ).format("DD/MM/YYYY HH:mm:ss")

        Class.create({
          name: (name || "").toLowerCase(),
          level,
          period,
          hour,
          dayOption,
          startingAge,
          finalAge,
          sexy,
          amount,
          amountPcd,
          amountCid,
          amountCadUnico,
          amountRow: (amount * 0.25 * 100) / 100,
          amountPcdRow: (amountPcd * 0.25 * 100) / 100,
          amountCidRow: (amountCid * 0.25 * 100) / 100,
          amountCadUnicoRow: (amountCadUnico * 0.25 * 100) / 100,
          amountToken: 0,
          description: (description || "").toLowerCase(),
          startingDateHourEnrollment: datehourEnrollment,
          finalDateHourMatriculation: datehourMatriculation,
          gymId,
          modalityId,
        })
          .then(() => {
            res.json({ success: msg.success.createClass })
          })
          .catch((err) => {
            res.json({ error: err })
          })
      }
    })
  },
}
module.exports = ClassController
