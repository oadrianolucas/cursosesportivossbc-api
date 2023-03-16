const User = require("../models/User")
const status = require("../middlewares/status")
const nodemailer = require("../middlewares/nodemailer")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")

const UsersController = {
  PostSingUp(req, res) {
    const email = req.body.email
    const password = req.body.password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const token = crypto.randomBytes(2).toString("hex")
    User.findOne({ where: { email: email } }).then((Email) => {
      if (Email != undefined) {
        res.json(status)
      } else {
        User.create({
          email: email,
          password: hash,
          token: token,
          filter: 0,
          status: 0,
        })
          .then(() => {
            nodemailer.emailConfirm(email, token)
            res.json(status.success.created_user)
          })
          .catch((err) => {
            res.json({ error: err })
          })
      }
    })
  },

  PostEmailToken(req, res) {
    const email = req.body.email
    const token = req.body.token
    User.findOne({ where: { email: email, token: token } }).then((user) => {
      if (user != undefined) {
        User.update(
          {
            token: null,
          },
          {
            where: {
              email: email,
            },
          }
        )
          .then(() => {
            res.json(status.success.email_password_confirm)
          })
          .catch((err) => {
            res.json({ error: err })
          })
      } else {
        res.json(status.error)
      }
    })
  },

  PostResetPasswordEmail(req, res) {
    const email = req.body.email
    const token = crypto.randomBytes(2).toString("hex")
    User.findOne({ where: { email: email } }).then((user) => {
      if (user != undefined) {
        User.update(
          {
            token: token,
          },
          {
            where: {
              email: email,
            },
          }
        )
          .then(() => {
            nodemailer.emailResetPassword(email, token)
            res.json(status.success)
          })
          .catch((err) => {
            res.json({ error: err })
          })
      } else {
        res.json(status.error)
      }
    })
  },

  PostResetPassword(req, res) {
    const id = req.body.id
    const password = req.body.password
    const compare_password = req.body.compare_password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    if (password == compare_password) {
      User.update(
        {
          token: null,
          password: hash,
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then(() => {
          res.json(status.success)
        })
        .cath((err) => {
          res.json({ error: err })
        })
    } else {
      res.json(status.error)
    }
  },

  GetFindAllUsers(req, res) {
    User.findAll().then((users) => {
      res.json({
        users: users.map((users) => users.toJSON()),
      })
    })
  },

  PostLogin(req, res) {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ where: { email: email } }).then((user) => {
      if (user != undefined) {
        const correct = bcrypt.compareSync(password, user.password)
        const token = user.token
        if (correct) {
          req.session.user = {
            email: user.email,
            token: user.token,
          }
          if (token == null) {
            res.json({ sucess: status.success })
          } else {
            res.json({ error: status.error })
          }
        } else {
          res.json({ error: status.error })
        }
      } else {
        res.json({ error: status.error })
      }
    })
  },
}

module.exports = UsersController
