const storage = require('./modules/storage')

storage.put('edno', 2)
storage.put('dve', 4)

console.log(storage.get('edno'))
storage.save()

storage.load()

setTimeout(() => {
  console.log(storage.get('dve'))
}, 100)
