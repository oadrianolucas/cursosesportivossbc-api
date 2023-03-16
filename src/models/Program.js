// Programas Esportivos
const db = require("../database/db")
const Program = db.sequelize.define("programs", { 
    name: db.Sequelize.STRING,
    description: db.Sequelize.STRING 
})
/*
Program.sync({force: true}).then(() =>{
  console.log('Create Program Table')
}).catch(err => console.log('Err Create Program Table: ' + err))
*/
module.exports = Program
