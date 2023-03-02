const User = require("../models/User")

const UsersController = {
    PostSingUp(req, res){
        const name = req.body.name
        const email = req.body.email
        const birth = req.body.birth
        const password = req.body.password
        User.create({
            name: (name || '').toLowerCase(),
            email: email,
            password: password,
            birth: birth,
            token_email: Math.random(),
            confirmation: false,
            filter: 0,
            status: 0
        }).then(()=>{
            res.send("Usuário Criado com Sucesso")
        }).catch((error) =>{
            res.send("Error: " + error)
        })
    }
}

module.exports = UsersController
