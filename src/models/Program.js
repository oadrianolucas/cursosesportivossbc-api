// Programas Esportivos
const db = require("../database/db")
//const Season = require("../models/Season")
const Program = db.sequelize.define("programs", {
  name: db.Sequelize.STRING,
  description: db.Sequelize.STRING,
  status: db.Sequelize.INTEGER,
  startEnrollment: db.Sequelize.STRING,
  endEnrollment: db.Sequelize.STRING,
  startMatriculation: db.Sequelize.STRING,
  endMatriculation: db.Sequelize.STRING,
  seasonId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})
/*
Season.hasMany(Program)
Program.sync({ force: true })
  .then(() => {
    console.log("Create Program Table")
  })
  .catch((err) => console.log("Err Create Program Table: " + err))
*/
module.exports = Program
