//person.js就是表的名字
// import mongoose from 'mongoose'
//import 语句不能使用，因为是ES6语法，要用ES6语法还要使用Babel
const mongoose = require('mongoose')
// 建表结构
let presonSchema = new mongoose.Schema({
  //字段
  name: String,
  age: Number
})
module.exports = mongoose.model('Person', presonSchema)