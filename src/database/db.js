const Sequelize = require("sequelize")
const sequelize = new Sequelize("cesbc", "root", "root", {
  host: "localhost",
  dialect: "mysql",
})

module.exports = { 
  sequelize: sequelize,
  Sequelize: Sequelize,
}

sequelize.authenticate()
  .then(() => {
    console.log("Conexão realizada com sucesso ao banco de dados")
  })
  .catch((err) => {
    console.log("Error ao se conectar com o banco de dados" + err)
  })