// Programas Esportivos
const db = require("../database/db")

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

module.exports = Program
