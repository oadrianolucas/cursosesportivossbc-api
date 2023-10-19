const User = require("../models/User");
const msg = require("../middlewares/msg");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "superSecretKey";
const emailSender = require("../middlewares/nodemailer");

const UsersController = {
  PostSingUp(req, res) {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const token = crypto.randomBytes(2).toString("hex");

    User.findOne({ where: { email: email } }).then((user) => {
      if (user != undefined) {
        res.status(500).json({ error: msg.error.emailExists });
      } else {
        User.create({
          email: email,
          password: hash,
          token: token,
          filter: 0,
          status: 0,
        })
          .then(async () => {
            try {
              await emailSender.emailConfirm(email, token);
              res.status(200).json({ success: msg.success.createUser });
            } catch (err) {
              res.status(500).json({ error: msg.error.sendEmail });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      }
    });
  },
  PostResetToken(req, res){
    const {email} = req.body;
    const token = crypto.randomBytes(2).toString("hex");
    User.findOne({where: {email: email}}).then((user) =>{
      if (!user) {
        return res.status(404).json({ error: msg.error.userNotFound });
      }
      return User.update(
        { token: token },
        { where: { email: email } }
      )
      .then(async () => {
        try {
          await emailSender.emailConfirm(email, token);
          res.status(200).json({ success: msg.success.emailTokenUpdate });
        } catch (err) {
          res.status(500).json({ error: msg.error.sendEmail });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
    });
  },
  PostEmailToken(req, res) {
    const { email, token } = req.body;
    User.findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: msg.error.userNotFound });
        }
        if (user.token !== token) {
          return res.status(403).json({ error: msg.error.tokenInvalid });
        }
        return User.update(
          { token: null },
          { where: { email: email } }
        )
          .then(() => {
            res.status(200).json({ success: msg.success.emailTokenUpdate });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: msg.error.tokenUpdateFailed });
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: msg.error.serverError });
      });
  },  
  PostAlterFilter(req, res) {
    const { id, filter } = req.body
    User.findOne({ where: { id: id } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: msg.error.userNotFound })
        }
        User.update({ filter: filter }, { where: { id } })
          .then(() => {
            res.status(200).json({ success: msg.success.updateFilter })
          })
          .catch((error) => {
            res.status(500).json({ error: msg.error.filterError })
          })
      })
      .catch((error) => {
        res.status(500).json({ error: msg.error.searchUserError })
      })
  },
  PostResetPasswordEmail(req, res) {
    const { email } = req.body
    const password = crypto.randomBytes(2).toString("hex")
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    User.findOne({ where: { email: email } }).then((user) => {
      if (user != undefined) {
        User.update(
          {
            password: hash,
            filter: 10,
          },
          {
            where: {
              email: email,
            },
          }
        )
        .then(async () => {
          try {
            await emailSender.emailResetPassword(email, password)
            res.status(200).json({success: msg.success.updatePassword})
          } catch (err) {
            console.error(err)
            res.status(500).json({ error: msg.error.sendEmail });
          }
        })
      } else {
        res.status(404).json({error: msg.error.invalidEmail})
      }
    })
  },
  PostUpdatePassword(req, res) {
    const { email, password_now, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    User.findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: msg.error.userNotFound });
        }
        const correct = bcrypt.compareSync(password_now, user.password)
        if (correct) {
          User.update(
            {
              token: null,
              password: hash,
              filter: 0,
            },
            {
              where: {
                id: user.id,
              },
            }
          )
            .then(() => {
              res.json({success: msg.success.newPassword});
            })
            .catch((err) => {
              res.json({ error: err });
            });
        } else {
          return res.status(404).json({ error: msg.error.newPasswordNotFound });
        }
      })
      .catch(() => {
        res.json(msg.error);
      });
  },  
  PostLogin(req, res) {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ where: { email: email } }).then((user) => {
      if (user != undefined) {
        const correct = bcrypt.compareSync(password, user.password)
        const emailConfirmationToken = user.token
        if (correct) {
          if (emailConfirmationToken == null) {
            const auth = jwt.sign({ email }, secretKey, { expiresIn: "1h" })
            req.session.user = {
              id: user.id,
              email: user.email,
              auth: auth,
            }
            if (user.filter === 10){
              res.status(408).json({ error: msg.error.updatePassword })
            } else {
              res.status(200).json({ success: msg.success.login, auth: auth })
            }
          } else {
            res.status(403).json({ error: msg.error.emailPasswordConfirm })
          }
        } else {
          res.status(401).json({ error: msg.error.invalidPassword })
        }
      } else {
        res.status(404).json({ error: msg.error.emailNotFound })
      }
    })
  },
  GetFindAllUsers(req, res) {
    const filters = {
      administrators: 1,
      teachers: 2,
      coordinators: 3,
      local_managers: 4,
      inters: 5,
      lifeguard: 6,
      contractors: 7,
    }

    const filterCounts = {}
    User.count()
      .then((count) => {
        const promises = Object.keys(filters).map((filter) => {
          return User.count({
            where: {
              filter: filters[filter],
            },
          })
            .then((count) => {
              filterCounts[filter] = count
            })
            .catch((err) => {
              console.error(err)
              filterCounts[filter] = 0
            })
        })

        filterCounts["totalUsers"] = count

        Promise.all(promises)
          .then(() => {
            res.status(200).json({ users: filterCounts })
          })
          .catch((error) => {
            res.status(500).json({
              error: error.message,
            })
          })
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        })
      })
  },

  GetFindUsers(req, res) {
    const page = req.query.page ? parseInt(req.query.page) : 1
    const pageSize = 10

    User.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    })
      .then((result) => {
        const pageCount = Math.ceil(result.count / pageSize)
        if (result.count === 0) {
          res.status(200).json({
            notfound: msg.error.userNotFound,
          })
        } else {
          res.status(200).json({
            users: result.rows.map((user) => user.toJSON()),
            totalPages: pageCount,
            currentPage: page,
          })
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  },

  GetFindUser(req, res) {
    const id = req.params.id
    User.findByPk(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: msg.error.userNotFound })
        }
        res.status(200).json({
          user: user.toJSON(),
        })
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  },

  GetFilterUsers(req, res) {
    const email = req.params.email
    const page = req.query.page ? parseInt(req.query.page) : 1
    const pageSize = 10
    const whereClause = email ? { email: email } : {}

    User.findAndCountAll({
      where: whereClause,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    })
      .then((result) => {
        const pageCount = Math.ceil(result.count / pageSize)

        res.status(200).json({
          users: result.rows.map((user) => user.toJSON()),
          totalPages: pageCount,
          currentPage: page,
        })
      })
      .catch((err) => {
        res.status(500).json({ error: err.message })
      })
  },
  PostLogoutUser(req, res) {
    req.session.user = undefined
    res.redirect("/")
  },
}

module.exports = UsersController
