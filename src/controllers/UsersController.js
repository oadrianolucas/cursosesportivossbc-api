const User = require("../models/User")
const msg = require("../middlewares/msg")
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
    User.findOne({ where: { email: email } }).then((user) => {
      if (user != undefined) {
        res.json({ error: msg.error.email })
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
            res.json({ success: msg.success.create_user })
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
            res.json({ success: msg.success.email_password_confirm })
          })
          .catch((err) => {
            res.json({ error: err })
          })
      } else {
        res.json({ error: msg.error.email_password_confirm })
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
            res.json(msg.success)
          })
          .catch((err) => {
            res.json({ error: err })
          })
      } else {
        res.json(msg.error)
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
          res.json(msg.success)
        })
        .cath((err) => {
          res.json({ error: err })
        })
    } else {
      res.json(msg.error)
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
            res.json({ sucess: msg.success })
          } else {
            res.json({ error: msg.error })
          }
        } else {
          res.json({ error: msg.error })
        }
      } else {
        res.json({ error: msg.error })
      }
    })
  },
}

module.exports = UsersController
