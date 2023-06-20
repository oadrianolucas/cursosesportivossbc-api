const db = require("../database/db")
// const User = require("../models/User")
const AdminCourse = db.sequelize.define("adminsCourses", {
  level: db.Sequelize.INTEGER,
})

// User.hasMany(AdminCourse)
// AdminCourse.sync({ force: true })
//   .then(() => {
//     console.log("Create AdminCourse Table")
//   })
//   .catch((err) => console.log("Err Create AdminCourse Table: " + err))

module.exports = AdminCourse
