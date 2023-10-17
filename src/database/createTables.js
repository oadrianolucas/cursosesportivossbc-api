const { sequelize } = require("./db")

// Importe os modelos aqui
const User = require("../models/User")
const Address = require("../models/Address")
const Gym = require("../models/Gym")
const Modality = require("../models/Modality")
const Institute = require("../models/Institute")
const Season = require("../models/Season")
const Registry = require("../models/Registry")
const GymAddress = require("../models/GymAddress")
const InstituteAddress = require("../models/InstituteAddress")
const AdminCourse = require("../models/AdminCourse")
const Program = require("../models/Program")
const Class = require("../models/Class")
const Enrollment = require("../models/Enrollment")
const SchoolCall = require("../models/SchoolCall")
const TokenClass = require("../models/TokenClass")
const UserAddress = require("../models/UserAddress")

// Defina as relações entre os modelos (se necessário)
User.hasMany(Registry)
Registry.belongsTo(User)

Gym.hasMany(Class)
Class.belongsTo(Gym)

Modality.hasMany(Class)
Class.belongsTo(Modality)

Gym.hasMany(GymAddress)
GymAddress.belongsTo(Gym)

Address.hasMany(GymAddress)
GymAddress.belongsTo(Address)

Institute.hasMany(InstituteAddress)
InstituteAddress.belongsTo(Institute)

Address.hasMany(InstituteAddress)
InstituteAddress.belongsTo(Address)

Season.hasMany(Program)
Program.belongsTo(Season)

Institute.hasMany(Program)
Program.belongsTo(Institute)

Modality.hasMany(Program)
Program.belongsTo(Modality)

Registry.hasMany(Enrollment)
Enrollment.belongsTo(Registry)

Class.hasMany(Enrollment)
Enrollment.belongsTo(Class)

Season.hasMany(Enrollment)
Enrollment.belongsTo(Season)

Registry.hasMany(TokenClass)
TokenClass.belongsTo(Registry)

Class.hasMany(TokenClass)
TokenClass.belongsTo(Class)

User.hasMany(UserAddress)
UserAddress.belongsTo(User)

Address.hasMany(UserAddress)
UserAddress.belongsTo(Address)

// Função para criar as tabelas
async function createTables() {
  try {
    await sequelize.sync({ force: true }) // Cria as tabelas
    console.log("Tabelas criadas com sucesso!")
  } catch (error) {
    console.error("Erro ao criar tabelas:", error)
  } finally {
    await sequelize.close() // Fecha a conexão com o banco de dados
  }
}

createTables()
