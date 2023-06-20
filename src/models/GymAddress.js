// Endereço relaciomento
const db = require("../database/db")
// const Address = require("./Address")
// const Gym = require("./Gym")

const GymAddress = db.sequelize.define("gymAddress", {
  gymId: {
    type: db.Sequelize.INTEGER,
  },
  addressId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})

// Address.hasMany(GymAddress)
// Gym.hasMany(GymAddress)

// GymAddress.sync({ force: true })
//   .then(() => {
//     console.log("Create GymAddress Table")
//   })
//   .catch((err) => console.log("Err Create GymAddress Table: " + err))

module.exports = GymAddress
