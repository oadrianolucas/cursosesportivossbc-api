const db = require("../database/db")
//const Course = require("../models/Course");
const AdminCourse = db.sequelize.define("adminsCourses", {
  level: db.Sequelize.INTEGER,
})
/*
Course.hasMany(AdminCourse)
AdminCourse.sync({force: true}).then(() =>{
  console.log('Create AdminCourse Table')
}).catch(err => console.log('Err Create AdminCourse Table: ' + err))
*/
module.exports = AdminCourse
