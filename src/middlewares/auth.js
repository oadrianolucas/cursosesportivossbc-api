const jwt = require('jsonwebtoken')
function auth(req, res, next){
    const secrets = '12345678'
    const mysecrets = req.session.auth
   if(secrets == mysecrets){
        const user = req.session.id
        const token = jwt.sign({ userId: user }, secret)
        if(token){
            next()
        } else {
            res.send(120)
        }  
   }  else {
        res.status(401).send('API não autenticada')
   }
}

module.exports = auth