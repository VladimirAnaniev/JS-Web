const fs = require('fs')
const url = require('url')
const path = require('path')

const getContentType = (url) => {
  if (url.endsWith('.ico')) return 'image/x-icon'
  else if (url.endsWith('.css')) return 'text/css'
  else if (url.endsWith('.html')) return 'text/html'
  return 'text/plain'
}

const notAllowed = (url) => {
  return !(url.endsWith('.ico') || url.endsWith('.css') || url.endsWith('.html') || url.endsWith('.jpg'))
}

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/public/') && req.method === 'GET') {
    let filepath = path.normalize(path.join(__dirname, `../../${req.pathname}`))

    fs.readFile(filepath, (err, data) => {
      if (err || notAllowed(filepath)) {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Not found, buddy!')
        res.end()
        return
      }

      res.writeHead(200, {'Content-Type': getContentType(req.pathname)})
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
