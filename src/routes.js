const router = require("express").Router()
const usersController = require("./controllers/UsersController")

router.post('/signup', usersController.PostSingUp)

router.get("/", (req, res) => {
  const status = {
    status: "online"
  }
  res.json(status)
})

module.exports = router