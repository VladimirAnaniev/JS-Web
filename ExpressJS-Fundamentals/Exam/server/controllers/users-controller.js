const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')

module.exports = {
  register: {
    get: (req, res) => {
      res.render('users/register')
    },
    post: (req, res) => {
      let reqUser = req.body
      // TODO: Add validations!

      let salt = encryption.generateSalt()
      let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

      User.create({
        username: reqUser.username,
        firstName: reqUser.firstName,
        lastName: reqUser.lastName,
        salt: salt,
        hashedPass: hashedPassword
      }).then(user => {
        req.logIn(user, (err, user) => {
          if (err) {
            res.locals.globalError = err
            res.render('users/register', user)
          }

          res.redirect('/')
        })
      })
    }
  },
  login: {
    get: (req, res) => {
      res.render('users/login')
    },
    post: (req, res) => {
      let reqUser = req.body
      User.findOne({username: reqUser.username}).then(user => {
        if (!user) {
          res.locals.globalError = 'Invalid user data'
          res.render('users/login')
          return
        }

        if (!user.authenticate(reqUser.password)) {
          res.locals.globalError = 'Invalid user data'
          res.render('users/login')
          return
        }

        req.logIn(user, (err, user) => {
          if (err) {
            res.locals.globalError = err
            res.render('users/login')
          }

          res.redirect('/')
        })
      })
    }
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}
