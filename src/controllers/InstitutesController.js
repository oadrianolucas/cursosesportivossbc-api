const Institute = require("../models/Institute")
const InstituteAddress = require("../models/InstituteAddress")
const Address = require("../models/Address")

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
          res.status(409).json({ error: "Instituto já foi criado." })
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
                  res
                    .status(200)
                    .json({ success: "Instituto criado com sucesso." })
                })
                .catch((err) => {
                  res.status(500).json({
                    error: "Ocorreu um erro ao criar o instituto.",
                  })
                })
            })
            .catch((err) => {
              res.status(500).json({ error: err })
            })
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Ocorreu um erro ao criar o instituto." })
      })
  },
  GetFindInstitutes(req, res) {
    const page = req.query.page ? parseInt(req.query.page) : 1
    const pageSize = 10
    Institute.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    })
      .then(async (result) => {
        const pageCount = Math.ceil(result.count / pageSize)
        const institutes = result.rows
        const institutesWithAddresses = []

        if (result.count === 0) {
          res.status(200).json({
            notfound: "Não existem institutos na base de dados",
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
            totalPages: pageCount,
            currentPage: page,
          })
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  },
}
module.exports = InstitutesController
