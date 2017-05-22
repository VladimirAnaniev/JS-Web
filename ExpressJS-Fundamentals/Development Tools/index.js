const http = require('http')
const port = 1586
const handlers = require('./src/handlers')

http.createServer((req, res) => {
  for (let handler of handlers) {
    if (!handler(req, res)) {
      break
    }
  }
}).listen(port)

console.log('listening on port: ' + port)
