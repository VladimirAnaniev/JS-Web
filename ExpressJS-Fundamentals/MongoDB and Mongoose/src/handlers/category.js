const fs = require('fs')
const url = require('url')
const path = require('path')
const qs = require('querystring')
const Category = require('../models/category')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/category/add' && req.method === 'GET') {
    let filepath = path.normalize(path.join(__dirname, '../../public/views/category/add.html'))

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
  } else if (req.pathname === '/category/add' && req.method === 'POST') {
    let queryData = ''
    req.on('data', (data) => {
      queryData += data
    })

    req.on('end', () => {
      let category = qs.parse(queryData)
      Category.create(category).then(() => {
        res.writeHead(302, {Location: '/'})
        res.end()
      })
    })
  } else {
    return true
  }
}
