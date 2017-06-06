const Category = require('../models/category')

module.exports = {
  add: {
    get: (req, res) => {
      res.render('category/add')
    },
    post: (req, res) => {
      Category
        .create({name: req.body.name})
        .then(() => {
          res.redirect('/?success=' +
            encodeURIComponent('Category was created successfully'))
        })
        .catch(() => {
          res.redirect('/?error=' +
            encodeURIComponent('Category was not created successfully'))
        })
    }
  },
  listProducts: (req, res) => {
    Category
      .findOne({name: req.params.category})
      .populate('products')
      .then(category => {
        res.render('category/products', {category: category})
      })
      .catch(() => {
        res.redirect('/?error=' +
          encodeURIComponent('No such category exists'))
      })
  }
}
