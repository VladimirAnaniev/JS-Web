const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let messageSchema = new mongoose.Schema({
  from: {type: mongoose.Schema.ObjectId, ref: 'User', required: REQUIRED_VALIDATION_MESSAGE},
  to: {type: mongoose.Schema.ObjectId, ref: 'User', required: REQUIRED_VALIDATION_MESSAGE},
  message: String,
  sent: {type: Date, default: Date.now},
  liked: {type: Boolean, default: false}
})

let Message = mongoose.model('Message', messageSchema)

module.exports = Message
