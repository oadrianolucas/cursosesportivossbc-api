// Endereço relaciomento
const db = require("../database/db")

const InstituteAddress = db.sequelize.define("instituteAddress", {
  instituteId: {
    type: db.Sequelize.INTEGER,
  },
  addressId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = InstituteAddress
