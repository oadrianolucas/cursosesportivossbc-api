const db = require("../database/db")
//const SportCenter = require("../models/SportCenter");
//const Season = require("../models/Season");
const Course = db.sequelize.define("courses", { 
    name: db.Sequelize.STRING,
    level: db.Sequelize.STRING,
    age: db.Sequelize.STRING,
    sexy: db.Sequelize.STRING,
    amount: db.Sequelize.INTEGER,
    dayOne: db.Sequelize.STRING,
    dayTwo: db.Sequelize.STRING,
    startTime: db.Sequelize.STRING,
    endTime: db.Sequelize.STRING,
})
/*
SportCenter.hasMany(Course)
Season.hasMany(Course)
Course.sync({force: true}).then(() =>{
  console.log('Create Course Table')
}).catch(err => console.log('Err Create Course Table: ' + err))
*/
module.exports = Course
