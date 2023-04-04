const Class = require("../models/Class")
const Modality = require("../models/Modality")
const Program = require("../models/Program")
const Gym = require("../models/Gym")
const Season = require("../models/Season")
const Registry = require("../models/Registry")
const User = require("../models/User")

const Enrollment = require("../models/Enrollment")
const EnrollmentController = {
  PostCreateEnrollment(req, res) {
    const { token, pcd, cid, cadUnico, registryId, classId, userId } = req.body
    async function createEnrollment() {
      try {
        const user = await User.findByPk(userId)
        const registry = await Registry.findByPk(registryId)
        const enrolledClass = await Class.findByPk(classId)

        if (!user) {
          return res.send({ error: "Usuário não encontrado" })
        }

        if (!registry) {
          return res.send({ error: "Registro não encontrado" })
        }

        if (registry.userId !== userId) {
          return res.send({ error: "Esse registro não pertence ao usuário" })
        }

        if (!enrolledClass) {
          return res.send({ error: "Turma não encontrada" })
        }

        const modality = await Modality.findByPk(enrolledClass.modalityId)
        const program = await Program.findByPk(modality.programId)
        const season = await Season.findByPk(program.seasonId)
        const gym = await Gym.findByPk(enrolledClass.gymId)

        if (!modality) {
          return res.send({ error: "Modalidade não encontrada" })
        }

        if (!program) {
          return res.send({ error: "Programa não encontrado" })
        }

        if (!season) {
          return res.send({ error: "Temporada não encontrada" })
        }

        if (!gym) {
          return res.send({ error: "Centro esportivo não encontrado" })
        }

        const hash = `${season.year}-${enrolledClass.modalityId}-${enrolledClass.period}-${modality.programId}-${enrolledClass.gymId}-${classId}`

        let bodyEnrollment = {
          token: 0,
          cid: 0,
          cadUnico: 0,
          pcd: 0,
          status: 1,
          hash: hash,
          registryId,
          classId,
        }
        let bodyClass = {}

        if (pcd !== undefined) {
          bodyEnrollment.pcd = pcd
          bodyClass.amountPcd = enrolledClass.amountPcd - 1
        } else if (cid !== undefined) {
          bodyEnrollment.cid = cid
          bodyClass.amountCid = enrolledClass.amountCid - 1
        } else if (cadUnico !== undefined) {
          bodyEnrollment.cadUnico = cadUnico
          bodyClass.amountCadUnico = enrolledClass.amountCadUnico - 1
        } else if (token !== undefined) {
          bodyEnrollment.token = token
          bodyClass.amountToken = enrolledClass.amountToken + 1
        } else {
          bodyClass.amount = enrolledClass.amount - 1
        }
        if (
          bodyClass.amount == -1 ||
          bodyClass.amountPcd == -1 ||
          bodyClass.amountCadUnico == -1 ||
          bodyClass.amountCid == -1
        ) {
          res.json({ error: "Quantidade disponível insuficiente." })
        } else {
          await Enrollment.create(bodyEnrollment)
          await Class.update(bodyClass, { where: { id: classId } })
          res.json({ success: "Inscrição efetuada com sucesso." })
        }
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Erro ao realizar a inscrição" })
      }
    }
    createEnrollment()
  },
}
module.exports = EnrollmentController
