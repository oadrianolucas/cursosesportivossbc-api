// Temporadas
const db = require("../database/db")
const Season = db.sequelize.define("seasons", {
  year: db.Sequelize.STRING,
})

// Season.sync({ force: true })
//   .then(() => {
//     console.log("Create Registry Table")
//   })
//   .catch((err) => console.log("Err Create Season Table: " + err))

module.exports = Season
