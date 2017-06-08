const mongoose = require('mongoose')
const Types = mongoose.Schema.Types

let productSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  price: {type: Number, min: 0, max: Number.MAX_VALUE, default: 0},
  image: String,
  category: {type: Types.ObjectId, ref: 'Category', required: true},
  creator: {type: Types.ObjectId, ref: 'User', required: true},
  buyer: {type: Types.ObjectId, ref: 'User'}
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product
