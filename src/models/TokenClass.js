const db = require("../database/db")
const TokenClass = db.sequelize.define("tokenClass", {
  token: db.Sequelize.STRING,
  registryId: {
    type: db.Sequelize.INTEGER,
  },
  classId: {
    type: db.Sequelize.INTEGER,
  },
})

module.exports = TokenClass
