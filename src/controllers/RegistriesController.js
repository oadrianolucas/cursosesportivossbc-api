const Registry = require("../models/Registry")
const status = require('../middlewares/status')

const RegistriesController = {
    PostCreatedRegistry(req, res){
        const name = req.body.name
        const birth = req.body.birth
        const phone = req.body.phone
        const sexy = req.body.sexy
        const cpf = req.body.cpf
        const rg = req.body.rg
        const sus = req.body.sus
        const user = req.body.user

        Registry.findOne({where: {cpf: cpf}}).then((Cpf) =>{
            if(Cpf != undefined){
                res.json(status.error)
            } else {
                Registry.create({
                    name: (name || '').toLowerCase(),
                    birth: birth,
                    phone: phone,
                    sexy: sexy,
                    cpf: cpf,
                    rg: rg,
                    sus: sus,
                    userId: user
                }).then(() =>{
                    res.json(status.success)
                }).catch((err) =>{
                    res.json("Error: " + err)
                })
            }
        })
    }
}

module.exports = RegistriesController
