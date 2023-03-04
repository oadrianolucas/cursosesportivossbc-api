const db = require("../database/db")
//const Address = require("../models/Address");
const SportCenter = db.sequelize.define("sportscenters", { 
    name: db.Sequelize.STRING
})
/*
Address.hasMany(SportCenter)
SportCenter.sync({force: true}).then(() =>{
  console.log('Create SportCenter Table')
}).catch(err => console.log('Err Create SportCenter Table: ' + err))
*/
module.exports = SportCenter
