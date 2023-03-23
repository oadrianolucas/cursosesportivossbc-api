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
// Associação entre RelationshipAddress e Address (um endereço pode estar vinculado a muitos usuários e centros esportivos)
Address.belongsToMany(User, { through: RelationshipAddress });
Address.belongsToMany(Gym, { through: RelationshipAddress });

// Associação entre User e RelationshipAddress (um usuário pode ter muitos endereços)
User.belongsToMany(Address, { through: RelationshipAddress });

// Associação entre Gym e RelationshipAddress (um centro esportivo pode ter muitos endereços)
Gym.belongsToMany(Address, { through: RelationshipAddress });

RelationshipAddress.sync({ force: true })
  .then(() => {
    console.log("Create RelationshipAddress Table")
  })
  .catch((err) => console.log("Err Create RelationshipAddress Table: " + err))
*/
module.exports = RelationshipAddress
