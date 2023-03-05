const status = require("../middlewares/status")
function filter(req, res, next) {
  const user = req.session.user
  if (user) {
    next()
  } else {
    res.json(status.error.login_notfound)
  }
}
module.exports = filter
