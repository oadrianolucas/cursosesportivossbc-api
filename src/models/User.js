const db = require("../database/db")
const User = db.Sequelize.define("users", {
  name: {
    type: db.sequelize.STRING,
  },
  email: {
    type: db.sequelize.STRING,
    unique: true,
  },
  birth: {
    type: db.sequelize.STRING,
  },
  password: {
    type: db.sequelize.STRING,
  },
  token_email: {
    type: db.sequelize.STRING,
  },
  confirmation: {
    type: db.sequelize.BOOLEAN,
  },
  filter: {
    type: db.sequelize.NUMBER,
  },
  status: {
    type: db.sequelize.NUMBER,
  }
})

User.sync({ force: true })

module.exports = User