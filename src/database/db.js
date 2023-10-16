const Sequelize = require("sequelize")
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
)

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
    console.log("error connect databases success " + err)
  })
