// Inscrição
const db = require("../database/db")
const Enrollment = db.sequelize.define("enrollments", {
  token: db.Sequelize.STRING,
  pcd: db.Sequelize.BOOLEAN,
  cid: db.Sequelize.STRING,
  cadUnico: db.Sequelize.STRING,
  status: db.Sequelize.INTEGER,
  hash: db.Sequelize.STRING,
  description: db.Sequelize.TEXT,
  registryId: {
    type: db.Sequelize.INTEGER,
  },
  classId: {
    type: db.Sequelize.INTEGER,
  },
  seasonId: {
    type: db.Sequelize.INTEGER,
  },
})

module.exports = Enrollment
