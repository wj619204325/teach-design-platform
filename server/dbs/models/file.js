const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  name: String,
  type: String,
  content: {
    CourseBrief: String,
    Academic_Analysis: String,
    Teach_Demand: String,
    Teach_Hard_Env: String,
    Teach_Soft_Env: String,
    Teach_Hard: String,
    Teach_Flow: String
  }
})
module.exports = mongoose.model('file', UserSchema)