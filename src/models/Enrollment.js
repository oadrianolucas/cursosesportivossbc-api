// Inscrição
const db = require("../database/db")
//const Class = require("../models/Class")
//const Registry = require("../models/Registry")
const Enrollment = db.sequelize.define("enrollments", {
  token: db.Sequelize.STRING,
  pcd: db.Sequelize.BOOLEAN,
  cid: db.Sequelize.STRING,
  cadUnico: db.Sequelize.STRING,
  status: db.Sequelize.INTEGER,
  hash: db.Sequelize.STRING,
  registryId: {
    type: db.Sequelize.INTEGER,
  },
  classId: {
    type: db.Sequelize.INTEGER,
  },
})
/*
Class.hasMany(Enrollment)
Registry.hasMany(Enrollment)
Enrollment.sync({ force: true })
  .then(() => {
    console.log("Create Enrollment Table")
  })
  .catch((err) => console.log("Err Create Enrollment Table: " + err))
*/
module.exports = Enrollment
