// Institutos
const db = require("../database/db")
const Institute = db.sequelize.define("institutes", {
  name: db.Sequelize.STRING,
  phone: db.Sequelize.STRING,
  description: db.Sequelize.TEXT,
  responsible: db.Sequelize.STRING,
})

// Institute.sync({ force: true })
//   .then(() => {
//     console.log("Create Institute Table")
//   })
//   .catch((err) => console.log("Err Create Institute Table: " + err))

module.exports = Institute
