const db = require("../database/db")
//const Class = require("../models/Class")
const TokenClass = db.sequelize.define("tokenClass", {
  token: db.Sequelize.STRING,
  registryId: {
    type: db.Sequelize.INTEGER,
  },
  classId: {
    type: db.Sequelize.INTEGER,
  },
})
/*=
Class.hasMany(TokenClass)
TokenClass.sync({ force: true })
  .then(() => {
    console.log("Create TokenClass Table")
  })
  .catch((err) => console.log("Err Create TokenClass Table: " + err))
*/
module.exports = TokenClass
