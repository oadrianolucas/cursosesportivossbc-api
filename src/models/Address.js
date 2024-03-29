// Endereço
const db = require("../database/db")
const Address = db.sequelize.define("addresses", {
  name: db.Sequelize.STRING,
  cep: db.Sequelize.STRING,
  district: db.Sequelize.STRING,
  city: db.Sequelize.STRING,
  state: db.Sequelize.STRING,
  number: db.Sequelize.STRING,
  complement: db.Sequelize.STRING,
})

module.exports = Address
