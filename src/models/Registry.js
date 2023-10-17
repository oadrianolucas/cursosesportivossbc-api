// Registros
const db = require("../database/db")
const Registry = db.sequelize.define("registries", {
  name: {
    type: db.Sequelize.STRING,
  },
  birth: {
    type: db.Sequelize.STRING,
  },
  phone: {
    type: db.Sequelize.STRING,
  },
  sexy: {
    type: db.Sequelize.CHAR,
  },
  cpf: {
    type: db.Sequelize.STRING,
  },
  sus: {
    type: db.Sequelize.STRING,
  },
  pcd: {
    type: db.Sequelize.BOOLEAN,
  },
  cadUnico: {
    type: db.Sequelize.STRING,
  },
  userId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = Registry
