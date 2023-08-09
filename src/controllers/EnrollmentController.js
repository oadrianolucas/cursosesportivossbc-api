const Class = require("../models/Class")
const Modality = require("../models/Modality")
const Program = require("../models/Program")
const Gym = require("../models/Gym")
const Season = require("../models/Season")
const Registry = require("../models/Registry")
const User = require("../models/User")
const Enrollment = require("../models/Enrollment")
const sequelize = require("sequelize")
const moment = require("moment")

/* 
  Status == 5 -> Fila de espera
  Status == 4 -> Se o registry já concluiu um curso
    exemplo: terminou natação nivel inicial.
      e se ele n tiver capacidade de anvançar???? como fazemos isso?
        Ele simplesmente não atualiza no sistema essa opção
  Status == 3 -> Inscrição
  Status == 2 -> Cancelada
  Status == 1 -> Matriculado
  Status == 0 -> Multa de 6 meses

  Erro na hora de criar um Enrollment, pelo fato de verificar se amount ou amountRow for igual a 0 para não poder cadastrar.
*/

const EnrollmentController = {
  PostCreateEnrollment(req, res) {
    const {
      token,
      pcd,
      cid,
      cadUnico,
      registryId,
      classId,
      userId,
      description,
    } = req.body
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
        const currentMonth = new Date().getMonth() + 1
        const Op = sequelize.Op

        const existingEnrollments = await Enrollment.findAll({
          where: {
            registryId,
            status: {
              [Op.lt]: 2,
            },
          },
        })

        if (existingEnrollments.length > 0) {
          const hasEnrollmentWithStatusZero = existingEnrollments.some(
            (enrollment) => enrollment.status === 0
          )

          if (hasEnrollmentWithStatusZero) {
            const lastEnrollmentWithStatusZero = existingEnrollments
              .filter((enrollment) => enrollment.status === 0)
              .sort((a, b) => b.createdAt - a.createdAt)[0]

            const sixMonthsAgo = new Date()
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

            if (lastEnrollmentWithStatusZero.createdAt > sixMonthsAgo) {
              return res.json({
                error:
                  "Não é possível criar uma nova inscrição por 6 meses devido ao não comparecimento em pelo menos 75% das aulas de um curso anterior. É lembrado da importância de participar ativamente das aulas e se preparar para futuras oportunidades de matrícula. Agradecimentos e desejos de sucesso são expressos.",
              })
            }
          } else {
            return res.json({
              error: "Já existe uma inscrição para essa modalidade e registro",
            })
          }
        }

        const existingEnrollmentWithStatusTwo = await Enrollment.findOne({
          where: {
            registryId,
            classId,
            status: 2,
          },
        })
        if (existingEnrollmentWithStatusTwo) {
          const enrollmentsWithStatusOneOrThree = await Enrollment.count({
            where: {
              registryId,
              status: {
                [Op.or]: [1, 3],
              },
            },
          })

          if (enrollmentsWithStatusOneOrThree >= 3) {
            return res.json({
              error:
                "Não é possível atualizar a inscrição, pois já existem 3 ou mais inscrições com status 'Inscrito' ou 'Matriculado'.",
            })
          }

          const dateUpdate =
            "Inscrição atualizada em: " + moment().format("DD/MM/YYYY")
          const oldDescription = existingEnrollmentWithStatusTwo.description
          const updatedDescription =
            oldDescription + " | " + dateUpdate + " Motivo: " + description
          await Enrollment.update(
            { status: 3, description: updatedDescription },
            { where: { id: existingEnrollmentWithStatusTwo.id } }
          )
          return res.json({ success: "Inscrição atualizada com sucesso." })
        }

        const existingEnrollment = await Enrollment.findOne({
          where: {
            registryId,
            hash: hash,
            [Op.or]: [
              {
                status: {
                  [Op.gt]: 2,
                },
              },
              {
                status: {
                  [Op.ne]: 0,
                  [Op.lt]: 2,
                },
                createdAt: {
                  [Op.between]: [
                    new Date(season.year, 0, 1),
                    new Date(season.year, 11, 31, 23, 59, 59),
                  ],
                },
              },
            ],
          },
        })
        if (existingEnrollment) {
          return res.json({
            error: "Já existe uma inscrição com essa modalidade",
          })
        }

        if (
          currentMonth === 1 &&
          (await Enrollment.count({
            where: {
              registryId,
              status: {
                [Op.notIn]: [2],
              },
              createdAt: {
                [Op.between]: [
                  new Date(season.year, 0, 1),
                  new Date(season.year, 0, 31, 23, 59, 59),
                ],
              },
            },
          })) >= 1
        ) {
          return res.json({
            error: "Permitido apenas 1 inscrição em janeiro",
          })
        }

        if (
          currentMonth === 2 &&
          (await Enrollment.count({
            where: {
              registryId,
              status: {
                [Op.notIn]: [2],
              },
              createdAt: {
                [Op.between]: [
                  new Date(season.year, 1, 1),
                  new Date(season.year, 1, 28, 23, 59, 59),
                ],
              },
            },
          })) >= 2
        ) {
          return res.json({
            error: "Permitido no máximo 2 inscrições por registro em fevereiro",
          })
        }

        if (
          currentMonth >= 3 &&
          (await Enrollment.count({
            where: {
              registryId,
              status: {
                [Op.notIn]: [2],
              },
              createdAt: {
                [Op.between]: [
                  new Date(season.year, 2, 1),
                  new Date(season.year, 11, 31, 23, 59, 59),
                ],
              },
            },
          })) >= 3
        ) {
          return res.json({
            error:
              "Permitido no máximo 3 inscrições por registro em março ou depois",
          })
        }

        const dateCreate =
          "Inscrição criada em: " + moment().format("DD/MM/YYYY")
        let bodyEnrollment = {
          token: 0,
          cid: 0,
          cadUnico: 0,
          pcd: 0,
          status: 3,
          hash: hash,
          description: dateCreate,
          registryId,
          classId,
          season: season.id,
        }

        let bodyClass = {}
        if (pcd !== undefined) {
          bodyEnrollment.pcd = pcd
          bodyClass.amountPcd = enrolledClass.amountPcd - 1
          bodyClass.amountPcdTotal = enrolledClass.amountPcdTotal + 1
        } else if (cid !== undefined) {
          bodyEnrollment.cid = cid
          bodyClass.amountCidTotal = enrolledClass.amountCid - 1
          bodyClass.amouamountCidTotalntCid = enrolledClass.amountCidTotal + 1
        } else if (cadUnico !== undefined) {
          bodyEnrollment.cadUnico = cadUnico
          bodyClass.amountCadUnico = enrolledClass.amountCadUnico - 1
          bodyClass.amountCadUnicoTotal = enrolledClass.amountCadUnicoTotal - 1
        } else if (token !== undefined) {
          bodyEnrollment.token = token
          bodyClass.amountToken = enrolledClass.amountToken + 1
        } else {
          bodyClass.amount = enrolledClass.amount - 1
          bodyClass.amountTotal = enrolledClass.amountTotal + 1
        }
        if (enrolledClass.amount === 0) {
          bodyClass.amountRow = enrolledClass.amountRow - 1
          bodyClass.amount = enrolledClass.amount + 1 - 1
        }
        if (enrolledClass.amountPcd === 0) {
          bodyClass.amountPcdRow = enrolledClass.amountPcdRow - 1
          bodyClass.amountPcd = enrolledClass.amountPcd + 1 - 1
        }
        if (enrolledClass.amountCid === 0) {
          bodyClass.amountCidRow = enrolledClass.amountCidRow - 1
          bodyClass.amountCid = enrolledClass.amountCid + 1 - 1
        }
        if (enrolledClass.amountCadUnico === 0) {
          bodyClass.amountCadUnicoRow = enrolledClass.amountCadUnicoRow - 1
          bodyClass.amountCadUnico = enrolledClass.amountCadUnico + 1 - 1
        }
        if (
          enrolledClass.amountRow === 0 &&
          enrolledClass.amountPcdRow === 0 &&
          enrolledClass.amountCidRow === 0 &&
          enrolledClass.amountCadUnicoRow === 0
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
