const Class = require("../models/Class")
const Modality = require("../models/Modality")
const Program = require("../models/Program")
const Gym = require("../models/Gym")
const Season = require("../models/Season")

const Enrollment = require("../models/Enrollment")
const EnrollmentController = {
  PostCreateEnrollment(req, res) {
    const { token, pcd, cid, cadUnico, registryId, classId } = req.body
    //validação se o registro já tem um curso.
    if (pcd !== undefined) {
      Class.findByPk(classId).then((class_) => {
        Modality.findByPk(class_.modalityId).then((modality_) => {
          if (modality_ != undefined) {
            Program.findByPk(modality_.programId).then((program_) => {
              if (program_ != undefined) {
                Season.findByPk(program_.seasonId).then((season_) => {
                  if (season_ != undefined) {
                    Gym.findByPk(class_.gymId).then((gym_) => {
                      if (gym_ != undefined) {
                        const hash =
                          season_.year +
                          "-" +
                          class_.modalityId +
                          "-" +
                          class_.period +
                          "-" +
                          modality_.programId +
                          "-" +
                          class_.gymId +
                          "-" +
                          classId

                        if (class_ != undefined) {
                          Enrollment.create({
                            token: 0,
                            cid: 0,
                            cadUnico: 0,
                            pcd,
                            status: 1,
                            hash: hash,
                            registryId,
                            classId,
                          }).then(() => {
                            Class.update(
                              {
                                amountPcd: class_.amountPcd - 1,
                              },
                              {
                                where: {
                                  id: classId,
                                },
                              }
                            )
                              .then(() => {
                                res.json({
                                  success:
                                    "inscrição pcd efetuada com sucesso.",
                                })
                              })
                              .catch((err) => {
                                res.json({ error: err })
                              })
                          })
                        } else {
                          res.json({ success: "turma não encontrada." })
                        }
                      } else {
                        console.log("Centro esportivo não encontrado")
                      }
                    })
                  } else {
                    console.log("Temporada não encontrada")
                  }
                })
              } else {
                console.log("Programa não encontrado")
              }
            })
          } else {
            console.log("Modalidade não encontrada")
          }
        })
      })
    } else if (cid !== undefined) {
      Class.findByPk(classId).then((class_) => {
        Modality.findByPk(class_.modalityId).then((modality_) => {
          if (modality_ != undefined) {
            Program.findByPk(modality_.programId).then((program_) => {
              if (program_ != undefined) {
                Season.findByPk(program_.seasonId).then((season_) => {
                  if (season_ != undefined) {
                    Gym.findByPk(class_.gymId).then((gym_) => {
                      if (gym_ != undefined) {
                        const hash =
                          season_.year +
                          "-" +
                          class_.modalityId +
                          "-" +
                          class_.period +
                          "-" +
                          modality_.programId +
                          "-" +
                          class_.gymId +
                          "-" +
                          classId

                        if (class_ != undefined) {
                          Enrollment.create({
                            token: 0,
                            cid,
                            cadUnico: 0,
                            pcd: 0,
                            status: 1,
                            hash: hash,
                            registryId,
                            classId,
                          }).then(() => {
                            Class.update(
                              {
                                amountCid: class_.amountCid - 1,
                              },
                              {
                                where: {
                                  id: classId,
                                },
                              }
                            )
                              .then(() => {
                                res.json({
                                  success:
                                    "inscrição cid efetuada com sucesso.",
                                })
                              })
                              .catch((err) => {
                                res.json({ error: err })
                              })
                          })
                        } else {
                          res.json({ success: "turma não encontrada." })
                        }
                      } else {
                        console.log("Centro esportivo não encontrado")
                      }
                    })
                  } else {
                    console.log("Temporada não encontrada")
                  }
                })
              } else {
                console.log("Programa não encontrado")
              }
            })
          } else {
            console.log("Modalidade não encontrada")
          }
        })
      })
    } else if (cadUnico !== undefined) {
      Class.findByPk(classId).then((class_) => {
        Modality.findByPk(class_.modalityId).then((modality_) => {
          if (modality_ != undefined) {
            Program.findByPk(modality_.programId).then((program_) => {
              if (program_ != undefined) {
                Season.findByPk(program_.seasonId).then((season_) => {
                  if (season_ != undefined) {
                    Gym.findByPk(class_.gymId).then((gym_) => {
                      if (gym_ != undefined) {
                        const hash =
                          season_.year +
                          "-" +
                          class_.modalityId +
                          "-" +
                          class_.period +
                          "-" +
                          modality_.programId +
                          "-" +
                          class_.gymId +
                          "-" +
                          classId

                        if (class_ != undefined) {
                          Enrollment.create({
                            token: 0,
                            cid: 0,
                            cadUnico,
                            pcd: 0,
                            status: 1,
                            hash: hash,
                            registryId,
                            classId,
                          }).then(() => {
                            Class.update(
                              {
                                amountCadUnico: class_.amountCadUnico - 1,
                              },
                              {
                                where: {
                                  id: classId,
                                },
                              }
                            )
                              .then(() => {
                                res.json({
                                  success:
                                    "inscrição cadUnico efetuada com sucesso.",
                                })
                              })
                              .catch((err) => {
                                res.json({ error: err })
                              })
                          })
                        } else {
                          res.json({ success: "turma não encontrada." })
                        }
                      } else {
                        console.log("Centro esportivo não encontrado")
                      }
                    })
                  } else {
                    console.log("Temporada não encontrada")
                  }
                })
              } else {
                console.log("Programa não encontrado")
              }
            })
          } else {
            console.log("Modalidade não encontrada")
          }
        })
      })
    } else if (token !== undefined) {
      Class.findByPk(classId).then((class_) => {
        Modality.findByPk(class_.modalityId).then((modality_) => {
          if (modality_ != undefined) {
            Program.findByPk(modality_.programId).then((program_) => {
              if (program_ != undefined) {
                Season.findByPk(program_.seasonId).then((season_) => {
                  if (season_ != undefined) {
                    Gym.findByPk(class_.gymId).then((gym_) => {
                      if (gym_ != undefined) {
                        const hash =
                          season_.year +
                          "-" +
                          class_.modalityId +
                          "-" +
                          class_.period +
                          "-" +
                          modality_.programId +
                          "-" +
                          class_.gymId +
                          "-" +
                          classId

                        if (class_ != undefined) {
                          Enrollment.create({
                            token: token,
                            cid: 0,
                            cadUnico: 0,
                            pcd: 0,
                            status: 1,
                            hash: hash,
                            registryId,
                            classId,
                          }).then(() => {
                            Class.update(
                              {
                                amountToken: class_.amountToken + 1,
                              },
                              {
                                where: {
                                  id: classId,
                                },
                              }
                            )
                              .then(() => {
                                res.json({
                                  success: "inscrição efetuada com sucesso.",
                                })
                              })
                              .catch((err) => {
                                res.json({ error: err })
                              })
                          })
                        } else {
                          res.json({ success: "turma não encontrada." })
                        }
                      } else {
                        console.log("Centro esportivo não encontrado")
                      }
                    })
                  } else {
                    console.log("Temporada não encontrada")
                  }
                })
              } else {
                console.log("Programa não encontrado")
              }
            })
          } else {
            console.log("Modalidade não encontrada")
          }
        })
      })
    } else {
      Class.findByPk(classId).then((class_) => {
        Modality.findByPk(class_.modalityId).then((modality_) => {
          if (modality_ != undefined) {
            Program.findByPk(modality_.programId).then((program_) => {
              if (program_ != undefined) {
                Season.findByPk(program_.seasonId).then((season_) => {
                  if (season_ != undefined) {
                    Gym.findByPk(class_.gymId).then((gym_) => {
                      if (gym_ != undefined) {
                        const hash =
                          season_.year +
                          "-" +
                          class_.modalityId +
                          "-" +
                          class_.period +
                          "-" +
                          modality_.programId +
                          "-" +
                          class_.gymId +
                          "-" +
                          classId

                        if (class_ != undefined) {
                          Enrollment.create({
                            token: 0,
                            cid: 0,
                            cadUnico: 0,
                            pcd: 0,
                            status: 1,
                            hash: hash,
                            registryId,
                            classId,
                          }).then(() => {
                            Class.update(
                              {
                                amount: class_.amount - 1,
                              },
                              {
                                where: {
                                  id: classId,
                                },
                              }
                            )
                              .then(() => {
                                res.json({
                                  success: "inscrição efetuada com sucesso.",
                                })
                              })
                              .catch((err) => {
                                res.json({ error: err })
                              })
                          })
                        } else {
                          res.json({ success: "turma não encontrada." })
                        }
                      } else {
                        console.log("Centro esportivo não encontrado")
                      }
                    })
                  } else {
                    console.log("Temporada não encontrada")
                  }
                })
              } else {
                console.log("Programa não encontrado")
              }
            })
          } else {
            console.log("Modalidade não encontrada")
          }
        })
      })
    }
  },
}
module.exports = EnrollmentController
