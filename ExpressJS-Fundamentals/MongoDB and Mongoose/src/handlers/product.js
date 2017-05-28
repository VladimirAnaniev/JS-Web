const fs = require('fs')
const url = require('url')
const path = require('path')
const multiparty = require('multiparty')
const shortid = require('shortid')
const Product = require('../models/product')
const Category = require('../models/category')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/product/add' && req.method === 'GET') {
    let filepath = path.normalize(path.join(__dirname, '../../public/views/product/add.html'))

    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Not found, buddy!')
        res.end()
        return
      }

      Category.find().then((categories) => {
        let replacement = '<select class="input-field" name="category">'
        for (let category of categories) {
          replacement += `<option value="${category._id}">${category.name}</option>`
        }
        replacement += '</select>'

        let html = data.toString().replace('{categories}', replacement)
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(html)
        res.end()
      })
    })
  } else if (req.pathname === '/product/add' && req.method === 'POST') {
    let form = new multiparty.Form()
    let product = {}

    form.on('part', (part) => {
      if (part.filename) {
        let datastring = ''

        part.setEncoding('binary')
        part.on('data', (data) => {
          datastring += data
        })

        part.on('end', () => {
          let fileName = shortid.generate()
          let filePath = path.normalize(path.join(__dirname, `../../public/images/${fileName}`))

          product.image = filePath

          fs.writeFile(filePath, datastring, 'binary', err => {
            if (err) {
              throw err
            }
          })
        })
      } else {
        part.setEncoding('utf-8')
        let field = ''
        part.on('data', data => {
          field += data
        })

        part.on('end', () => {
          product[part.name] = field
        })
      }
    })

    form.on('close', () => {
      Product.create(product).then((dbProduct) => {
        Category.findById(product.category).then((category) => {
          category.products.push(dbProduct._id)
          category.save()

          res.writeHead(302, {Location: '/'})
          res.end()
        })
      })
    })

    form.parse(req)
  } else {
    return true
  }
}
