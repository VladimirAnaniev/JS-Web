const path = require('path')

module.exports = {
  development: {
    port: 6969,
    connectionString: 'mongodb://localhost:27017/ShopExpress',
    rootPath: path.normalize(path.join(__dirname, '../../'))
  },
  production: {

  }
}
