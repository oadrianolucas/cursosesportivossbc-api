// Emd
const db = require("../database/db")
//const Registry = require("../models/Registry");
const Address = db.sequelize.define("adresses", { 
    name: db.Sequelize.STRING,
    cep: db.Sequelize.STRING,
    district: db.Sequelize.STRING,
    city: db.Sequelize.STRING,
    number: db.Sequelize.STRING,
    complement: db.Sequelize.STRING
})
/*
Registry.hasMany(Address)
Address.sync({force: true}).then(() =>{
  console.log('Create Address Table')
}).catch(err => console.log('Err Create Address Table: ' + err))
*/
module.exports = Address
