// Turma
const db = require("../database/db")
//const Gym = require("../models/Gym");
//const Season = require("../models/Season");
const Class = db.sequelize.define("classes", {
  name: db.Sequelize.STRING,
  level: db.Sequelize.STRING,
  startingAge: db.Sequelize.INTEGER,
  finalAge: db.Sequelize.INTEGER,
  sexy: db.Sequelize.STRING,
  amount: db.Sequelize.INTEGER,
  gymId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  seasonId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})
/*
Gym.hasMany(Course)
Season.hasMany(Course)
Class.sync({force: true}).then(() =>{
  console.log('Create Class Table')
}).catch(err => console.log('Err Create Class Table: ' + err))
*/
module.exports = Class
