// Curso
const db = require("../database/db")
//const Modality = require("../models/Modality")
const Course = db.sequelize.define("courses", {
  name: db.Sequelize.STRING,
  description: db.Sequelize.STRING,
  modalityId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})
/*
Modality.hasMany(Course)
Course.sync({ force: true })
  .then(() => {
    console.log("Create Course Table")
  })
  .catch((err) => console.log("Err Create Course Table: " + err))
*/
module.exports = Course
