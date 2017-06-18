const mongoose = require('mongoose')

let threadSchema = new mongoose.Schema({
  user1: {type: mongoose.Schema.ObjectId, ref: 'User'},
  user2: {type: mongoose.Schema.ObjectId, ref: 'User'},
  messages: [{type: mongoose.Schema.ObjectId, ref: 'Message'}],
  updated: {type: Date, default: Date.now}
})

let Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread
