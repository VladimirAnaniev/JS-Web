const Product = require('../models/product')
const Category = require('../models/category')
const fs = require('fs')
const path = require('path')

module.exports = {
  add: {
    get: (req, res) => {
      Category.find()
        .then((categories) => {
          res.render('product/add', {categories: categories})
        })
    },
    post: (req, res) => {
      Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: `/${req.file.path}`,
        category: req.body.category,
        isBought: {type: Boolean, default: false}
      })
        .then((product) => {
          Category
            .findById(product.category)
            .then(category => {
              category.products.push(product._id)
              category.save()
            })
          res.redirect('/?success=' +
            encodeURIComponent('Product was created successfully'))
        })
    }
  },
  edit: {
    get: (req, res) => {
      Product
        .findById(req.params.id)
        .then(product => {
          Category.find()
            .then((categories) => {
              res.render('product/edit', {
                product: product,
                categories: categories
              })
            })
        })
        .catch(() => {
          res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`)
        })
    },
    post: (req, res) => {
      Product
        .findById(req.params.id)
        .then(product => {
          product.name = req.body.name
          product.description = req.body.description
          product.price = req.body.price
          if (req.file) {
            product.image = '\\' + req.file.path
          }
          let categoryId = req.body.category
          if (product.category !== categoryId) {
            Category
              .findById(product.category)
              .then(currentCategory => {
                Category
                  .findById(categoryId)
                  .then(newCategory => {
                    let index = currentCategory.products.indexOf(product._id)
                    if (index >= 0) {
                      currentCategory.products.splice(index, 1)
                    }
                    currentCategory.save()
                    newCategory.products.push(product._id)
                    newCategory.save()
                    product.category = req.body.category
                    product.save()
                      .then(() => {
                        res.redirect('/?success=' +
                          encodeURIComponent('Product was edited successfully'))
                      })
                  })
              })
          } else {
            product.save()
              .then(() => {
                res.redirect('/?success=' +
                  encodeURIComponent('Product was edited successfully'))
              })
          }
        })
        .catch(() => {
          res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`)
        })
    }
  },
  delete: {
    get: (req, res) => {
      Product
        .findById(req.params.id)
        .then(product => {
          res.render('product/delete', {product: product})
        })
        .catch(() => {
          res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`)
        })
    },
    post: (req, res) => {
      Product
        .findById(req.params.id)
        .then(currentProduct => {
          Category
            .findById(currentProduct.category)
            .then(currentCategory => {
              let imagePath = currentProduct.image
              let index = currentCategory.products.indexOf(req.params.id)
              if (index >= 0) {
                currentCategory.products.splice(index, 1)
              }
              currentCategory.save()
              Product
                .findByIdAndRemove(req.params.id)
                .then(() => {
                  fs.unlink(path.join('.', imagePath), () => {
                    res.redirect('/?success=' +
                      encodeURIComponent('Product was deleted successfully'))
                  })
                })
            })
        })
        .catch(() => {
          res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`)
        })
    }
  }
}
