// Institutos
const db = require("../database/db")
const Institute = db.sequelize.define("institutes", {
  name: db.Sequelize.STRING,
  phone: db.Sequelize.STRING,
  description: db.Sequelize.TEXT,
  responsible: db.Sequelize.STRING,
})

module.exports = Institute
