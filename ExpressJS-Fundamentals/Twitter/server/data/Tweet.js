const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let tweetSchema = new mongoose.Schema({
  author: {type: mongoose.Schema.ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'User'},
  content: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
  creationDate: {type: Date, default: Date.now},
  tags: [String],
  handles: [String],
  views: {type: Number, default: 0},
  likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
})

tweetSchema.path('content').validate(function (val) {
  return val.length <= 140
}, 'The maximum length is 140')

tweetSchema.method({
  incrementViews: function () {
    this.views += 1
    this.save()
  }
})

let Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet
