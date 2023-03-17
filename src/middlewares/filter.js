const msg = require("../middlewares/msg")
function filter(req, res, next) {
  const user = req.session.user
  if (user) {
    next()
  } else {
    res.json({ error: msg.error.login_notfound })
  }
}
module.exports = filter
