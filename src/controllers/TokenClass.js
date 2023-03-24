const TokenClass = require("../models/TokenClass")
const Registry = require("../models/Registry")
const crypto = require("crypto")
const msg = require("../middlewares/msg")
const TokenClassController = {
  PostCreateTokenClass(req, res) {
    const { registryId, classId } = req.body
    const bytes = crypto.randomBytes(3)
    const hexString = bytes.toString("hex")
    const token = hexString.replace(/[^0-9a-fA-F]/g, "")
    Registry.findByPk(registryId).then((registry) => {
      if (registry != undefined) {
        TokenClass.create({
          token: token,
          registryId,
          classId,
        })
          .then(() => {
            res.json({ success: "token feito" })
          })
          .catch((err) => {
            res.json({ error: err })
          })
      } else {
        res.json({ error: "registro não encotrado" })
      }
    })
  },
}

module.exports = TokenClassController
