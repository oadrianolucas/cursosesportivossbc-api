// Chamada de aula
const db = require("../database/db")
// const Class = require("../models/Class")
// const User = require("../models/User")
const SchoolCall = db.sequelize.define("schoolCall", {
  date: db.Sequelize.STRING,
})

// SchoolCall.hasMany(Class)
// User.hasMany(User)
// SchoolCall.sync({ force: true })
//   .then(() => {
//     console.log("Create SchoolCall Table")
//   })
//   .catch((err) => console.log("Err Create SchoolCall Table: " + err))

module.exports = SchoolCall
