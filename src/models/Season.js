const db = require("../database/db")
const Season = db.sequelize.define("seasons", {
    year: db.Sequelize.STRING,
    status: db.Sequelize.INTEGER,
    startEnrollment: db.Sequelize.STRING,
    endEnrollment: db.Sequelize.STRING,
    startMatriculation: db.Sequelize.STRING,
    endMatriculation: db.Sequelize.STRING,
})

/*
Season.sync({force: true}).then(() =>{
    console.log('Create Registry Table')
}).catch(err => console.log('Err Create Season Table: ' + err))
*/
module.exports = Season