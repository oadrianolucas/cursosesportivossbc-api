const router = require("express").Router()
const usersController = require("./controllers/UsersController")
const registriesController = require("./controllers/RegistriesController")
const seasonsController = require("./controllers/SeasonsController")
const programsController = require("./controllers/ProgramsController")
const addressesController = require("./controllers/AddressesController")
const gymsController = require("./controllers/GymsController")
const modalityController = require("./controllers/ModalityController")
const classController = require("./controllers/ClassController")
const enrollmentController = require("./controllers/EnrollmentController")
const tokenClass = require("./controllers/TokenClass")

const msg = require("./middlewares/msg")
const filter = require("./middlewares/filter")

router.post("/signup", usersController.PostSingUp)
router.post("/login", usersController.PostLogin)
router.post("/email/token", usersController.PostEmailToken)
router.post("/reset/password", usersController.PostResetPasswordEmail)
router.get("/dashboard", usersController.GetFindAllUsers)
router.post("/create/season", seasonsController.PostCreateSeason)
router.post("/create/program", programsController.PostCreateProgram)
router.post("/create/gym", gymsController.PostCreatedGym)
router.post("/create/address/user", addressesController.PostCreateAddressUser)
router.post("/create/address/gym", addressesController.PostCreateAddressGym)
router.post("/create/modality", modalityController.PostCreateModality)
router.post("/create/class", classController.PostCreateClass)
router.post("/create/enrollment", enrollmentController.PostCreateEnrollment)
router.post("/create/token/class", tokenClass.PostCreateTokenClass)

router.post(
  "/create/registry",
  filter,
  registriesController.PostCreatedRegistry
)
router.get("/", (req, res) => {
  res.status(200).json({ success: msg.success.on })
})
router.use((req, res) => {
  new Error("Not Found")
  res.json({ error: msg.error.e404 })
})

module.exports = router
