// Endereço relaciomento
const db = require("../database/db")
const GymAddress = db.sequelize.define("gymAddress", {
  gymId: {
    type: db.Sequelize.INTEGER,
  },
  addressId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = GymAddress
