const handlers = require('../handlers')
const multer = require('multer')({dest: '../public/images'})

module.exports = (app) => {
  app.get('/', handlers.home.index)

  app.get('/product/add', handlers.product.add.get)
  app.post('/product/add', multer.single('image'), handlers.product.add.post)
  app.get('/product/edit/:id', handlers.product.edit.get)
  app.post('/product/edit/:id', multer.single('image'), handlers.product.edit.post)
  app.get('/product/delete/:id', handlers.product.delete.get)
  app.post('/product/delete/:id', handlers.product.delete.post)

  app.get('/category/add', handlers.category.add.get)
  app.post('/category/add', handlers.category.add.post)
  app.get('/category/:category/products', handlers.category.listProducts)

  app.all('*', handlers.home.notFound)
}
