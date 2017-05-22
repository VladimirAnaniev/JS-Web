const fs = require('fs')

function save (data, callback) {
  fs.writeFile('storage.dat', data, (err) => {
    if (err) {
      throw err
    }

    callback()
  })
}

function load (callback) {
  fs.readFile('storage.dat', (err, data) => {
    if (err) {
      throw err
    }

    callback(data)
  })
}

module.exports = {save, load}
