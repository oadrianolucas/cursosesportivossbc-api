// Endereço relaciomento
const db = require("../database/db")
/*
const User = require("./User")
const Address = require("./Address")
*/
const UserAddress = db.sequelize.define("userAddress", {
  userId: {
    type: db.Sequelize.INTEGER,
  },
  addressId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})
/*
Address.hasMany(UserAddress)
User.hasMany(UserAddress)

UserAddress.sync({ force: true })
  .then(() => {
    console.log("Create UserAddress Table")
  })
  .catch((err) => console.log("Err Create UserAddress Table: " + err))
*/
module.exports = UserAddress
