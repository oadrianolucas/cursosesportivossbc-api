const db = require("../database/db")
const User = db.sequelize.define("users", {
  name: {
    type: db.Sequelize.STRING,
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  birth: {
    type: db.Sequelize.STRING,
  },
  password: {
    type: db.Sequelize.STRING,
  },
  token_email: {
    type: db.Sequelize.STRING,
  },
  confirmation: {
    type: db.Sequelize.BOOLEAN,
  },
  filter: {
    type: db.Sequelize.NUMBER,
  },
  status: {
    type: db.Sequelize.NUMBER,
  }
})

module.exports = User
