const User = require('mongoose').model('User')

module.exports = {
  all: (req, res) => {
    User.find({roles: 'Admin'})
      .then(admins => {
        res.render('admins/all', {admins: admins})
      })
  },
  remove: (req, res) => {
    User.findOneAndUpdate({username: req.params.username}, {$pull: {roles: 'Admin'}})
      .then(user => {
        res.redirect('admins/all')
      })
      .catch(err => {
        res.redirect('admins/all', {globalError: err})
      })
  },
  add: {
    get: (req, res) => {
      User.find({roles: {$nin: ['Admin']}})
        .then(users => {
          res.render('admins/add', {users})
        })
        .catch(err => {
          res.render('admins/add', {globalError: err})
        })
    },
    post: (req, res) => {
      User.findOneAndUpdate({username: req.body.username}, {$push: {roles: 'Admin'}})
        .then(() => {
          res.redirect('/admins/all')
        })
        .catch(err => {
          console.log(err)
          res.redirect('/admins/all')
        })
    }
  }
}
