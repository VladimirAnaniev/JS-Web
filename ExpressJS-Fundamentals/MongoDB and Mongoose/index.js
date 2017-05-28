const http = require('http')
const handlers = require('./src/handlers')
const config = require('./src/config/config')
const db = require('./src/config/db.config')

let environment = process.env.NODE_ENV || 'development'
const port = 1586

db(config[environment])

http.createServer((req, res) => {
  for (let handler of handlers) {
    if (!handler(req, res)) {
      break
    }
  }
}).listen(port)

console.log('listening on port: ' + port)
