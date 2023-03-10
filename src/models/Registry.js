const db = require("../database/db")
//const User = require("../models/User");
const Registry = db.sequelize.define("registries", {
  name: {
    type: db.Sequelize.STRING,
  },
  birth: {
    type: db.Sequelize.STRING,
  },
  phone: {
    type: db.Sequelize.STRING,
  },
  sexy: {
    type: db.Sequelize.CHAR,
  },
  cpf: {
    type: db.Sequelize.STRING,
  },
  rg: {
    type: db.Sequelize.STRING,
  },
  sus: {
    type: db.Sequelize.STRING,
  },
})

/*
User.hasMany(Registry)
Registry.sync({force: true}).then(() =>{
  console.log('Create Registry Table')
}).catch(err => console.log('Err Create Registry Table: ' + err))
*/

module.exports = Registry
