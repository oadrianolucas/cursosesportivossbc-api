// Centros Esportivos
const db = require("../database/db")
const Gym = db.sequelize.define("gyms", {
  name: db.Sequelize.STRING,
  description: db.Sequelize.STRING,
})

module.exports = Gym
