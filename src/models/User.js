const db = require("../database/db")
const User = db.sequelize.define("users", {
  email: {
    type: db.Sequelize.STRING,
    unique: true,
  },
  password: {
    type: db.Sequelize.STRING,
  },
  token: {
    type: db.Sequelize.STRING,
  },
  filter: {
    type: db.Sequelize.INTEGER,
  },
  status: {
    type: db.Sequelize.INTEGER,
  }
})

/*
User.sync({force: true}).then(() =>{
  console.log('Create User Table')
}).catch(err => console.log('Err Create User Table: ' + err))
*/

module.exports = User
