const express = require("express")
const router = express.Router()

const msg = require("./middlewares/msg")
const filter = require("./middlewares/filter")

const {
  PostSingUp,
  PostLogoutUser,
  PostLogin,
  PostEmailToken,
  PostResetPasswordEmail,
  PostAlterFilter,
  GetFilterUsers,
  GetFindAllUsers,
  GetFindUsers,
  GetFindUser,
} = require("./controllers/UsersController")

const {
  PostCreateSeason,
  PostCreateProgram,
} = require("./controllers/SeasonsController")

const {
  PostCreateGym,
  PostDeleteGym,
  GetFindGyms,
} = require("./controllers/GymsController")

const {
  PostCreateModality,
  GetFindModalities,
} = require("./controllers/ModalityController")

const { PostCreateClass, GetFindGym } = require("./controllers/ClassController")

const {
  PostCreateEnrollment,
  PostCreateTokenClass,
} = require("./controllers/EnrollmentController")

const {
  PostCreateInstitute,
  PostDeleteInstitute,
  GetFindInstitutes,
} = require("./controllers/InstitutesController")

const {
  PostCreateAddressUser,
  PostCreateAddressGym,
} = require("./controllers/AddressesController")

// Define routes
router.post("/signup", PostSingUp)
router.post("/logout", PostLogoutUser)
router.post("/login", PostLogin)
router.post("/email/token", PostEmailToken)
router.post("/reset/password", PostResetPasswordEmail)
router.post("/alter/filter/user", PostAlterFilter)
router.get("/search/users/:email", GetFilterUsers)
router.get("/total/users", GetFindAllUsers)
router.get("/users", GetFindUsers)
router.get("/user/:id", GetFindUser)

router.post("/create/season", PostCreateSeason)
router.post("/create/program", PostCreateProgram)

router.post("/create/gym", PostCreateGym)
router.post("/delete/gym", PostDeleteGym)
router.get("/gyms", GetFindGyms)
router.get("/gym/:id", GetFindGym)

router.post("/create/modality", PostCreateModality)
router.get("/modalities", GetFindModalities)

router.post("/create/class", PostCreateClass)

router.post("/create/enrollment", PostCreateEnrollment)
router.post("/create/token/class", PostCreateTokenClass)

router.post("/create/institute", PostCreateInstitute)
router.post("/delete/institute", PostDeleteInstitute)
router.get("/institutes", GetFindInstitutes)

router.post("/create/address/user", PostCreateAddressUser)
router.post("/create/address/gym", PostCreateAddressGym)

// Default route
router.get("/", (req, res) => {
  res.status(200).json({ success: msg.success.welcome })
})

// 404 Not Found handler
router.use((req, res) => {
  res.status(404).json({ error: msg.error.e404 })
})

module.exports = router
