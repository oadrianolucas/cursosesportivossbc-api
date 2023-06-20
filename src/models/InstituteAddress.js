// Endereço relaciomento
const db = require("../database/db")
// const Address = require("./Address")
// const Institute = require("./Institute")

const InstituteAddress = db.sequelize.define("instituteAddress", {
  instituteId: {
    type: db.Sequelize.INTEGER,
  },
  addressId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})

// Address.hasMany(InstituteAddress)
// Institute.hasMany(InstituteAddress)

// InstituteAddress.sync({ force: true })
//   .then(() => {
//     console.log("Create InstituteAddress Table")
//   })
//   .catch((err) => console.log("Err Create InstituteAddress Table: " + err))

module.exports = InstituteAddress
