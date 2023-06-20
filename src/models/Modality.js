// Modalidades
const db = require("../database/db")
// const Program = require("../models/Program")
const Modality = db.sequelize.define("modalities", {
  name: db.Sequelize.STRING,
  description: db.Sequelize.STRING,
  programId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})

// Program.hasMany(Modality)
// Modality.sync({ force: true })
//   .then(() => {
//     console.log("Create Modality Table")
//   })
//   .catch((err) => console.log("Err Create Modality Table: " + err))

module.exports = Modality
