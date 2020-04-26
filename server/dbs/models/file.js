import mongoose from 'mongoose'
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
export default mongoose.model('file', UserSchema)