const fs = require('fs')
const url = require('url')
const path = require('path')
const Product = require('../models/product')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/' && req.method === 'GET') {
    let filepath = path.normalize(path.join(__dirname, '../../public/views/home.html'))

    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Not found, buddy!')
        res.end()
        return
      }

      Product.find().then((products) => {
        let content = ''

        for (let product of products) {
          content += `
<div class="product-card">
    <img class="product-img" src="${product.image}" />
    <h2>${product.name}</h2>
    <p>${product.description}</p>
</div>`
        }
        let html = data.toString().replace('{content}', content)

        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(html)
        res.end()
      })
    })
  } else {
    return true
  }
}
