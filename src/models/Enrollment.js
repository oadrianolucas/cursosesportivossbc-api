const db = require("../database/db")
//const Course = require("../models/Course");
const Enrollment = db.sequelize.define("enrollments", { 
    name: db.Sequelize.STRING,
})
/*
Enrollment.hasMany(Course)
Enrollment.sync({force: true}).then(() =>{
  console.log('Create Enrollment Table')
}).catch(err => console.log('Err Create Enrollment Table: ' + err))
*/
module.exports = Enrollment
