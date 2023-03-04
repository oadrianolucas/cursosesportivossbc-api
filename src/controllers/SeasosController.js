const Season = require("../models/Season")
const status = require('../middlewares/status')
const SeasonsController = {
    PostCreatedSeason(req, res){
        const year = req.body.year
        Season.findOne({where: {year: year}}).then((Year) =>{
            if(Year != undefined){
                res.json(status.error)
            } else {
                Season.create({
                    year: year
                }).then(() =>{
                    res.json(status.success)
                }).cath((err) =>{
                    res.json("Error: " + err)
                })
            }
        })
    }

}

module.exports = SeasonsController