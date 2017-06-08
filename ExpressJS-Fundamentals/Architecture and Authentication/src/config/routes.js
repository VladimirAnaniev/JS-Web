const controllers = require('../controllers')
const multer = require('multer')({dest: '../public/images'})

module.exports = (app) => {
  app.get('/', controllers.home.index)

  // Products
  app.get('/product/add', controllers.product.add.get)
  app.post('/product/add', multer.single('image'), controllers.product.add.post)
  app.get('/product/edit/:id', controllers.product.edit.get)
  app.post('/product/edit/:id', multer.single('image'), controllers.product.edit.post)
  app.get('/product/delete/:id', controllers.product.delete.get)
  app.post('/product/delete/:id', controllers.product.delete.post)

  // Categories
  app.get('/category/add', controllers.category.add.get)
  app.post('/category/add', controllers.category.add.post)
  app.get('/category/:category/products', controllers.category.listProducts)

  // Users
  app.get('/user/register', controllers.user.register.get)
  app.post('/user/register', controllers.user.register.post)
  app.get('/user/login', controllers.user.login.get)
  app.post('/user/login', controllers.user.login.post)
  app.post('/user/logout', controllers.user.logout)

  app.all('*', controllers.home.notFound)
}
