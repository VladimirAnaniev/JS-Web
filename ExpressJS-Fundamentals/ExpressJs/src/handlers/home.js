const Product = require('../models/product')

module.exports = {
  index: (req, res) => {
    let queryData = req.query
    Product.find()
      .populate('category')
      .then((products) => {
        if (queryData.query) {
          products = products.filter(
            p => p.name.toLowerCase().includes(queryData.query))
        }
        let data = {products: products}
        if (req.query.error) {
          data.error = req.query.error
        } else if (req.query.success) {
          data.success = req.query.success
        }
        res.render('home/index', data)
      })
  },
  notFound: (req, res) => {
    res.render('home/notFound')
  }
}
