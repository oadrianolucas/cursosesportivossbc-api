const db = require("../database/db")
//const Course = require("../models/Course");
//const User = require("../models/User");
const Call = db.sequelize.define("calls", {
  date: db.Sequelize.STRING
})
/*
Call.hasMany(Course)
User.hasMany(User)
Call.sync({force: true}).then(() =>{
  console.log('Create Call Table')
}).catch(err => console.log('Err Create Call Table: ' + err))
*/
module.exports = Call
