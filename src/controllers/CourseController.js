const Course = require("../models/Course")
const msg = require("../middlewares/msg")

const CourseController = {
  PostCreatedModality(req, res) {
    const { name, description, modalityId } = req.body
    Course.findOne({ where: { name: name } }).then((gym) => {
      if (gym != undefined) {
        res.json({ error: "curso já foi criado." })
      } else {
        Course.create({
          name: (name || "").toLowerCase(),
          description: (description || "").toLowerCase(),
          modalityId,
        })
          .then(() => {
            res.json({ success: "curso criada com sucesso." })
          })
          .catch((err) => {
            res.json({ error: err })
          })
      }
    })
  },
}
module.exports = CourseController
