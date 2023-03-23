// Centros Esportivos
const db = require("../database/db")
const Gym = db.sequelize.define("gyms", {
  name: db.Sequelize.STRING,
})
/*
Gym.sync({ force: true })
  .then(() => {
    console.log("Create Gym Table")
  })
  .catch((err) => console.log("Err Create Gym Table: " + err))
*/
module.exports = Gym
