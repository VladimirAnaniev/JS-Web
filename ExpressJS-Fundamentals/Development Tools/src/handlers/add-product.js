const fs = require('fs')
const url = require('url')
const path = require('path')
const multiparty = require('multiparty')
const shortid = require('shortid')

const database = require('../config/db')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/product/add' && req.method === 'GET') {
    let filepath = path.normalize(path.join(__dirname, '../../public/views/add-product.html'))

    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Not found, buddy!')
        res.end()
        return
      }

      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(data)
      res.end()
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
      database.products.add(product)

      res.writeHead(302, {Location: '/'})
      res.end()
    })

    form.parse(req)
  } else {
    return true
  }
}
