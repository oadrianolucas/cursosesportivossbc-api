// Temporadas
const db = require("../database/db")
const Season = db.sequelize.define("seasons", {
  year: db.Sequelize.STRING,
})

module.exports = Season
