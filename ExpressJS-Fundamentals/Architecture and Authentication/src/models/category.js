const mongoose = require('mongoose')
const Types = mongoose.Schema.Types

let categorySchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  products: [ {type: Types.ObjectId, ref: 'Product'} ],
  creator: {type: Types.ObjectId, ref: 'User', required: true}
})

let Category = mongoose.model('Category', categorySchema)

module.exports = Category
