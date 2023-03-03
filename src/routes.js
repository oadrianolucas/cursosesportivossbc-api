const router = require("express").Router()
const usersController = require("./controllers/UsersController")
const registriesController = require("./controllers/RegistriesController")

const status = require('./middlewares/status')
router.post('/signup', usersController.PostSingUp)
router.post('/created/registry', registriesController.PostCreatedRegistry)

router.get("/", (req, res) => {
  res.json(status.success)
})

router.use((req, res) => {
  new Error('Not Found')
  res.json(status.error)
})

module.exports = router