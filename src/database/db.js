const Sequelize = require("sequelize")
const sequelize = new Sequelize("cursosesportivos", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3308,
})

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize,
}

sequelize
  .authenticate()
  .then(() => {
    console.log("connect databases success.")
  })
  .catch((err) => {
    console.log("error connect databases success: " + err)
  })
