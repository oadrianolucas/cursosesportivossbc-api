// Endereço relaciomento
const db = require("../database/db")
/*
const User = require("../models/User")
const Gym = require("../models/Gym")
const Address = require("../models/Address")
*/
const RelationshipAddress = db.sequelize.define("relationshipAddress", {
  userId: {
    type: db.Sequelize.INTEGER,
  },
  gymId: {
    type: db.Sequelize.INTEGER,
  },
  addressId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
  },
})
/*  
Address.hasMany(RelationshipAddress);
User.hasMany(RelationshipAddress);
Gym.hasMany(RelationshipAddress);

RelationshipAddress.sync({ force: true })
  .then(() => {
    console.log("Create RelationshipAddress Table")
  })
  .catch((err) => console.log("Err Create RelationshipAddress Table: " + err))
*/
module.exports = RelationshipAddress
