const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  email: {
    // unique: true,
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  MyFiles: [String],
  CollectFiles: [String]
})
module.exports = mongoose.model('user', UserSchema)