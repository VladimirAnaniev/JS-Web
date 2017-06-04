const mongoose = require('mongoose')
const Types = mongoose.Schema.Types

let imageSchema = mongoose.Schema({
  url: {type: Types.String},
  creationDate: {type: Types.Date, default: Date.now},
  description: {type: Types.String},
  tags: [{type: Types.ObjectId, ref: 'Tag'}]
})

let Image = mongoose.model('Image', imageSchema)

module.exports = Image
