// Turma
const db = require("../database/db")
// const Gym = require("../models/Gym")
// const Modality = require("../models/Modality")
const Class = db.sequelize.define("classes", {
  name: db.Sequelize.STRING,
  level: db.Sequelize.STRING,
  period: db.Sequelize.STRING,
  hour: db.Sequelize.STRING,
  dayOption: db.Sequelize.STRING,
  startingAge: db.Sequelize.INTEGER,
  finalAge: db.Sequelize.INTEGER,
  sexy: db.Sequelize.STRING,
  amount: db.Sequelize.INTEGER,
  amountPcd: db.Sequelize.INTEGER,
  amountCid: db.Sequelize.INTEGER,
  amountCadUnico: db.Sequelize.INTEGER,
  amountTotal: db.Sequelize.INTEGER,
  amountPcdTotal: db.Sequelize.INTEGER,
  amountCidTotal: db.Sequelize.INTEGER,
  amountCadUnicoTotal: db.Sequelize.INTEGER,
  amountToken: db.Sequelize.INTEGER,
  amountRow: db.Sequelize.INTEGER,
  amountPcdRow: db.Sequelize.INTEGER,
  amountCidRow: db.Sequelize.INTEGER,
  amountCadUnicoRow: db.Sequelize.INTEGER,
  description: db.Sequelize.STRING,
  startingDateHourEnrollment: db.Sequelize.STRING,
  finalDateHourMatriculation: db.Sequelize.STRING,
  gymId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
  modalityId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})

// Gym.hasMany(Class)
// Class.belongsTo(Modality)
// Class.sync({ force: true })
//   .then(() => {
//     console.log("Create Class Table")
//   })
//   .catch((err) => console.log("Err Create Class Table: " + err))

module.exports = Class
