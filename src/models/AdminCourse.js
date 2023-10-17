const db = require("../database/db")
const AdminCourse = db.sequelize.define("adminsCourses", {
  level: db.Sequelize.INTEGER,
})

module.exports = AdminCourse
