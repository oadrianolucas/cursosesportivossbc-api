// Modalidades
const db = require("../database/db")
const Modality = db.sequelize.define("modalities", {
  name: db.Sequelize.STRING,
  description: db.Sequelize.STRING,
})

module.exports = Modality
