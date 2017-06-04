const mongoose = require('mongoose')
const db = require('./instanode-db')
mongoose.Promise = global.Promise

const connectionString = 'mongodb://localhost:27017/mongoose-exercise'

mongoose.connect(connectionString).then(() => {
  console.log('MongoDB connected')

  db.saveImage({url: 'gosho', description: 'pich', tags: ['losho momche', 'zoro']})

  db.findByTag('nqma').then(console.log)

  db.filter({results: 10}).then(console.log)
})
