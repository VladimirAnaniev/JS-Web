const mongoose = require('mongoose')
const Types = mongoose.Schema.Types

let tagSchema = mongoose.Schema({
  name: Types.String,
  creationDate: {type: Types.Date, default: Date.now},
  images: [{type: Types.ObjectId, ref: 'Image'}]
})

let Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
