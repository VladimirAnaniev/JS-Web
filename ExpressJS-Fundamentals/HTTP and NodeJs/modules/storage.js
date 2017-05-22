const file = require('./file')

let storage = new Map()

function put (key, value) {
  if (typeof key !== 'string' || storage.has(key)) {
    throw new Error('Illegal put')
  }

  storage.set(key, value)
}

function get (key) {
  if (typeof key !== 'string' || !storage.has(key)) {
    throw new Error('Illegal get')
  }

  return storage.get(key)
}

function update (key, value) {
  if (typeof key !== 'string' || !storage.has(key)) {
    throw new Error('Illegal update')
  }

  storage.set(key, value)
}

function remove (key) {
  if (typeof key !== 'string' || !storage.has(key)) {
    throw new Error('Illegal remove')
  }

  storage.delete(key)
}

function clear () {
  storage.clear()
}

function save () {
  let data = []

  for (let [k, v] of storage.entries()) {
    data.push({key: k, value: v})
  }
  file.save(JSON.stringify(data), () => {
    clear()
  })
}

function load () {
  clear()
  file.load((data) => {
    for (let pair of JSON.parse(data)) {
      put(pair.key, pair.value)
    }
  })
}

module.exports = {
  put, get, update, remove, clear, save, load
}
