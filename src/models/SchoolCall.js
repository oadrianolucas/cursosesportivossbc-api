// Chamada de aula
const db = require("../database/db")
const SchoolCall = db.sequelize.define("schoolCall", {
  date: db.Sequelize.STRING,
})

module.exports = SchoolCall
