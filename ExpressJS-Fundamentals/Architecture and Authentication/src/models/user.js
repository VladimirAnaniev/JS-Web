const mongoose = require('mongoose')
const Types = mongoose.Schema.Types
const encryption = require('../utils/encryption')

let userSchema = mongoose.Schema({
  username: {type: String, required: 'Username is required', unique: true},
  salt: {type: String, required: 'Salt is required'},
  password: {type: String, required: 'Password is required'},
  firstName: {type: String, required: 'First name is required'},
  lastName: {type: String, required: 'Last name is required'},
  age: {type: Number, min: 0, max: 100},
  gender: {type: String, enum: ['Male', 'Female', 'Other']},
  roles: [String],
  boughtProducts: [{type: Types.ObjectId, ref: 'Product'}],
  createdProducts: [{type: Types.ObjectId, ref: 'Product'}],
  createdCategories: [{type: Types.ObjectId, ref: 'Category'}]
})

userSchema.method({
  authenticate: function (password) {
    return this.password === encryption.generateHashedPassword(password, this.salt)
  }

})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedAdmin = () => {
  User.find({username: 'admin'}).then(users => {
    if (users.length === 0) {
      let salt = encryption.generateSalt()
      let pass = encryption.generateHashedPassword('admin', salt)

      User.create({
        username: 'admin',
        salt: salt,
        password: pass,
        firstName: 'Admin',
        lastName: 'Big Boss',
        age: 69,
        gender: 'Other',
        roles: ['Admin']
      })
    }
  })
}
