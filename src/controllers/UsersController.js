const User = require("../models/User")
const status = require('../middlewares/status')

const UsersController = {
    PostSingUp(req, res){
        const email = req.body.email
        const password = req.body.password
        
        User.findOne({where: {email: email}}).then((Email) =>{
            if(Email != undefined){
                res.json(status.error)
            } else {
                User.create({
                    email: email,
                    password: password,
                    token_email: Math.floor(Math.random() * 100000) + "ce",
                    confirmation: false,
                    filter: 0,
                    status: 0
                }).then(()=>{
                    res.json(status.success)
                }).catch((err) =>{
                    res.json("Error: " + err)
                })
            }
        })
    }
}

module.exports = UsersController
