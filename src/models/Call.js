const db = require("../database/db")
//const Course = require("../models/Course");
const Call = db.sequelize.define("calls", {})
/*
Call.hasMany(Course)
Call.sync({force: true}).then(() =>{
  console.log('Create Call Table')
}).catch(err => console.log('Err Create Call Table: ' + err))
*/
module.exports = Call
