const router = require("express").Router()
const usersController = require("./controllers/UsersController")

router.post('/signup', usersController.PostSingUp)

router.get("/", (req, res) => {
  const status = {
    status: "online"
  }
  res.json(status)
})

router.use((req, res) => {
  var err = new Error('Not Found')
  err.status = "404"
  const status = {
    error: err
  }
  res.json(status)
})

module.exports = router