const app = require('express')()

let env = process.env.NODE_ENV || 'development'

const config = require('./config/config')[env]

require('./config/database')(config)
require('./config/express')(app, config)
require('./config/routes')(app)
require('./config/passport')()

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`)
})
