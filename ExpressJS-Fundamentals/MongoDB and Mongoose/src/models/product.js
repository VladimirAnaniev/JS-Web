const mongoose = require('mongoose')
const Types = mongoose.Schema.Types

let productSchema = mongoose.Schema({
  name: {type: Types.String, required: true},
  description: {type: Types.String},
  price: {type: Types.Number, min: 0, max: Number.MAX_VALUE, default: 0},
  image: {type: Types.String},
  category: {type: Types.ObjectId, ref: 'Category'},
  isBought: {type: Types.Boolean, default: false}
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product
