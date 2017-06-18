const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/thread/:username', auth.isAuthenticated, controllers.thread.thread)
  app.post('/thread/:username', auth.isAuthenticated, controllers.thread.send)

  app.post('/like/:id', auth.isAuthenticated, controllers.thread.message.like)
  app.post('/dislike/:id', auth.isAuthenticated, controllers.thread.message.dislike)

  app.post('/block/:username', auth.isAuthenticated, controllers.users.block)
  app.post('/unblock/:username', auth.isAuthenticated, controllers.users.unblock)

  app.get('/users/register', controllers.users.register.get)
  app.post('/users/register', controllers.users.register.post)
  app.get('/users/login', controllers.users.login.get)
  app.post('/users/login', controllers.users.login.post)
  app.post('/users/logout', controllers.users.logout)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
