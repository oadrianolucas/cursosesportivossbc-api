// Programas Esportivos
const db = require("../database/db")
// const Season = require("../models/Season")
// const Institute = require("../models/Institute")
// const Modality = require("../models/Modality")

const Program = db.sequelize.define("programs", {
  name: db.Sequelize.STRING,
  description: db.Sequelize.STRING,
  status: db.Sequelize.INTEGER,
  seasonId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  instituteId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  modalityId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})

// Season.hasMany(Program)
// Institute.hasMany(Program)
// Modality.hasMany(Program)
// Program.sync({ force: true })
//   .then(() => {
//     console.log("Create Program Table")
//   })
//   .catch((err) => console.log("Err Create Program Table: " + err))

module.exports = Program
