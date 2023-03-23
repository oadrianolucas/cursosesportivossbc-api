const RelationshipAddress = require("../models/RelationshipAddress")
const Address = require("../models/Address")
const AddressesController = {
  PostCreateAddress(req, res) {
    const { name, cep, district, city, number, complement, userId, gymId } =
      req.body
    Address.create({
      name,
      cep,
      district,
      city,
      number,
      complement,
    })
      .then((address) => {
        if (userId && gymId) {
          res.json({
            error:
              "O endereço só deverar ser cadastrado ou para um usuário ou para um centro esportivo.",
          })
        } else {
          RelationshipAddress.create({
            userId,
            gymId,
            addressId: address.id,
          })
            .then(() => {
              res.json({
                success: "Endereço criado com sucesso.",
              })
            })
            .catch((err) => {
              res.json({ error: err })
            })
        }
      })
      .catch((err) => {
        res.json({ error: err })
      })
  },
}
module.exports = AddressesController
