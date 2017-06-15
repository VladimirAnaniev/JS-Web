const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', auth.isAuthenticated, controllers.home.about)

  app.get('/users/register', controllers.users.register.get)
  app.post('/users/register', controllers.users.register.post)
  app.get('/users/login', controllers.users.login.get)
  app.post('/users/login', controllers.users.login.post)
  app.post('/users/logout', controllers.users.logout)

  app.get('/admins/all', auth.isInRole('Admin'), controllers.admins.all)
  app.post('/admins/remove/:username', auth.isInRole('Admin'), controllers.admins.remove)
  app.get('/admins/add', auth.isInRole('Admin'), controllers.admins.add.get)
  app.post('/admins/add', auth.isInRole('Admin'), controllers.admins.add.post)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
