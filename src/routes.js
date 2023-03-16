const router = require("express").Router()
const usersController = require("./controllers/UsersController")
const registriesController = require("./controllers/RegistriesController")
const status = require("./middlewares/status")
const filter = require("./middlewares/filter")

router.post("/signup", usersController.PostSingUp)
router.post("/login", usersController.PostLogin)
router.post("/email/token", usersController.PostEmailToken)
router.post("/reset/password", usersController.PostResetPasswordEmail)
router.get("/dashboard", filter, usersController.GetFindAllUsers)
router.post(
  "/create/registry",
  filter,
  registriesController.PostCreatedRegistry
)
router.get("/", (req, res) => {
  res.status(200).json(status.success.on)
})
router.use((req, res) => {
  new Error("Not Found")
  res.json(status.error.e404)
})

module.exports = router
