// Usuários
const db = require("../database/db")
const User = db.sequelize.define("users", {
  email: {
    type: db.Sequelize.STRING,
    unique: true,
  },
  password: {
    type: db.Sequelize.STRING,
  },
  token: {
    type: db.Sequelize.STRING,
  },
  filter: {
    type: db.Sequelize.INTEGER,
  },
  status: {
    type: db.Sequelize.INTEGER,
  },
})

module.exports = User
