const User = require('../models/user')
const encryption = require('../utils/encryption')

module.exports = {
  register: {
    get: (req, res) => {
      res.render('user/register')
    },
    post: (req, res) => {
      let user = req.body

      if (user.password && user.password !== user.confirmedPassword) {
        user.error = 'Passwords don\'t match'
        res.render('user/register', user)
        return
      }

      user.salt = encryption.generateSalt()
      user.password = encryption.generateHashedPassword(user.password, user.salt)

      User.create(user).then(user => {
        req.logIn(user, (err, loggedIn) => {
          if (err) {
            res.render('user/register', {error: 'Authentication not available'})
            return
          }

          res.redirect('/')
        })
      }).catch(err => {
        user.error = err.message
        res.render('user/register', user)
      })
    }
  },
  login: {
    get: (req, res) => {
      res.render('user/login')
    },
    post: (req, res) => {
      User.findOne({username: req.body.username}).then(user => {
        if (!user || !user.authenticate(req.body.password)) {
          res.render('user/login', {error: 'Invalid credentials'})
          return
        }

        req.logIn(req.body, (err, user) => {
          if (err) {
            console.log(err)
            res.render('user/login', {error: 'Authentication not available'})
            return
          }
          res.redirect('/')
        })
      }).catch(err => {
        res.render('user/login', {error: err.message})
      })
    }
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }

}
