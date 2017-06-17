const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/tweet', auth.isAuthenticated, controllers.tweets.tweet.get)
  app.post('/tweet', auth.isAuthenticated, controllers.tweets.tweet.post)
  app.post('/tweet/like/:id', auth.isAuthenticated, controllers.tweets.tweet.like)
  app.post('/tweet/dislike/:id', auth.isAuthenticated, controllers.tweets.tweet.dislike)
  app.get('/tag/:tag', controllers.tweets.tag.tagname)

  app.get('/profile/:username', auth.isAuthenticated, controllers.users.profile)
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
