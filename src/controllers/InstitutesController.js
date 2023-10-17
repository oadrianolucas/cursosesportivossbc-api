const Institute = require("../models/Institute")
const InstituteAddress = require("../models/InstituteAddress")
const Address = require("../models/Address")
const msg = require("../middlewares/msg")

const InstitutesController = {
  PostCreateInstitute(req, res) {
    const {
      name,
      description,
      phone,
      responsible,
      addressName,
      cep,
      district,
      city,
      state,
      number,
      complement,
    } = req.body

    Institute.findOne({ where: { name: name } })
      .then((existingInstitute) => {
        if (existingInstitute) {
          res.status(409).json({ error: msg.error.createInstituted })
        } else {
          Institute.create({
            name: (name || "").toLowerCase(),
            description: (description || "").toLowerCase(),
            phone,
            responsible: (responsible || "").toLowerCase(),
          })
            .then((createdInstitute) => {
              Address.create({
                name: (addressName || "").toLowerCase(),
                cep,
                district: (district || "").toLowerCase(),
                city: (city || "").toLowerCase(),
                state: (state || "").toLowerCase(),
                number: (number || "").toLowerCase(),
                complement: (complement || "").toLowerCase(),
              })
                .then((createdAddress) => {
                  return InstituteAddress.create({
                    instituteId: createdInstitute.id,
                    addressId: createdAddress.id,
                  })
                })
                .then(() => {
                  res.status(200).json({ success: msg.success.createInstitute })
                })
                .catch((err) => {
                  res.status(500).json({
                    error: msg.error.createInstituteError,
                  })
                })
            })
            .catch((err) => {
              res.status(500).json({ error: err })
            })
        }
      })
      .catch((err) => {
        res.status(500).json({ error: msg.error.createInstituteError })
      })
  },
  GetFindInstitutes(req, res) {
    Institute.findAll({})
      .then(async (institutes) => {
        const institutesWithAddresses = []
        if (institutes.length === 0) {
          res.status(200).json({
            notfound: msg.error.noInstitutesFound,
          })
        } else {
          for (const institute of institutes) {
            const instituteData = institute.toJSON()
            const address = await InstituteAddress.findOne({
              where: { instituteId: institute.id },
            })

            if (address) {
              const addressData = await Address.findOne({
                where: { id: address.addressId },
              })
              if (addressData) {
                instituteData.Address = addressData.toJSON()
              }
            }
            institutesWithAddresses.push(instituteData)
          }

          res.status(200).json({
            institutes: institutesWithAddresses,
          })
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  },
  PostDeleteInstitute(req, res) {
    const id = req.body.id
    if (id != undefined) {
      if (!isNaN(id)) {
        Institute.destroy({
          where: {
            id: id,
          },
        }).then(() => {
          res.status(200).json({ success: msg.success.deleteInstitute })
        })
      } else {
        res.status(500).json({ error: msg.error.deleteInstituteError })
      }
    } else {
      res.status(404).json({ error: msg.error.noInstitutesFound })
    }
  },
}
module.exports = InstitutesController
