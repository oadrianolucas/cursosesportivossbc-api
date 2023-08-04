require("dotenv").config()
const express = require("express")
const session = require("express-session")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
const routes = require("./routes")
app.set("port", process.env.PORT || 3000)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
)
app.use(
  session({
    secret: "erg0eg65256ge",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    resave: false,
    saveUninitialized: true,
  })
)
app.use((req, res, next) => {
  res.locals.user = req.session.user
  next()
})
app.use("/api/v1/", routes)

module.exports = app
