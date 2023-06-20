const jwt = require("jsonwebtoken")
const msg = require("../middlewares/msg")

function filter(req, res, next) {
  const authHeader = req.headers["authorization"]
  console.log("Authorization Header:", authHeader)
  if (authHeader) {
    const auth = authHeader.split(" ")[1]
    jwt.verify(auth, "superSecretKey", (err) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido ou expirado." })
      } else {
        next()
      }
    })
  } else {
    return res.status(401).json({ error: "Nenhum token fornecido." })
  }
}

module.exports = filter
