// Endereço relaciomento
const db = require("../database/db")
const UserAddress = db.sequelize.define("userAddress", {
  userId: {
    type: db.Sequelize.INTEGER,
  },
  addressId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})
module.exports = UserAddress
