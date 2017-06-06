const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

module.exports = (app, config) => {
  // Middleware for parsing form data
  app.use(bodyParser.urlencoded({extended: true}))

  // Static file handling
  app.use((req, res, next) => {
    if (req.url.startsWith('/public')) {
      req.url = req.url.replace('/public', '')
    }
    next()
  }, express.static(
    path.normalize(
      path.join(
        config.rootPath, 'public')
    )))

  // Pug config
  app.set('view engine', 'pug')
  app.set('views', path.join(config.rootPath, '/src/views'))
}
