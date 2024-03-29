const UserAddress = require("../models/UserAddress")
const GymAddress = require("../models/GymAddress")
const msg = require("../middlewares/msg")
const Address = require("../models/Address")

const AddressesController = {
  PostCreateAddressUser(req, res) {
    const { name, cep, district, city, number, complement, state, userId } =
      req.body
    Address.create({
      name: (name || "").toLowerCase(),
      cep,
      district: (district || "").toLowerCase(),
      city: (city || "").toLowerCase(),
      state: (state || "").toLowerCase(),
      number,
      complement: (complement || "").toLowerCase(),
    })
      .then((address) => {
        UserAddress.create({
          userId,
          addressId: address.id,
        })
          .then(() => {
            res.json({
              success: msg.success.createAddress,
            })
          })
          .catch((err) => {
            res.json({
              error: msg.error.createAddress,
            })
          })
      })
      .catch((err) => {
        res.json({
          error: msg.error.createAddress,
        })
      })
  },
  PostCreateAddressGym(req, res) {
    const { name, cep, district, city, number, complement, state, gymId } =
      req.body
    Address.create({
      name: (name || "").toLowerCase(),
      cep,
      district: (district || "").toLowerCase(),
      city: (city || "").toLowerCase(),
      state: (state || "").toLowerCase(),
      number,
      complement: (complement || "").toLowerCase(),
    })
      .then((address) => {
        GymAddress.create({
          gymId,
          addressId: address.id,
        })
          .then(() => {
            res.json({
              success: msg.success.createAddress,
            })
          })
          .catch((err) => {
            res.json({
              error: msg.error.createAddress,
            })
          })
      })
      .catch((err) => {
        res.json({
          error: msg.error.createAddress,
        })
      })
  },
}
module.exports = AddressesController
