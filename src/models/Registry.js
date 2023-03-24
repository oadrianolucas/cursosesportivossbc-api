// Registros
const db = require("../database/db")
//const User = require("../models/User")
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
/*
User.hasMany(Registry)
Registry.sync({ force: true })
  .then(() => {
    console.log("Create Registry Table")
  })
  .catch((err) => console.log("Err Create Registry Table: " + err))
*/
module.exports = Registry
