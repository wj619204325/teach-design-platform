const router = require('koa-router')()
const Person = require('../dbs/models/person')
// /users是 
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
//增
router.post('/addPerson', async function (ctx) {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  try {
    //save是model的方法
    await person.save()
    code = 200
  } catch (e) {
    code = 400
  }
  ctx.body = {
    code: code
  }
})
//删
router.post('/removePerson', async function (ctx) {
  let code
  try {
    //save是model的方法
    await Person.where({
      name: ctx.request.body.name
    }).remove()
    code = 200
  } catch (e) {
    code = 400
  }
  ctx.body = {
    code: code
  }
})
//查
router.get('/getPerson', async function (ctx) {
  const result = {},
    results = []
  let code
  try {
    //查找一个,return {}
    result = await Person.findOne({
      name: ctx.request.body.name
    })
    //查找所有，return [{}]
    results = await Person.find({
      name: ctx.request.body.name
    })
    code = 200
  } catch (e) {
    code = 400
  }
  ctx.body = {
    code: code
  }
})
//改
router.post('/updatePerson', async function (ctx) {
  let code
  try {
    //save是model的方法
    await Person.where({
      name: ctx.request.body.name
    }).update({
      age: ctx.request.body.age
    })
    code = 200
  } catch (e) {
    code = 400
  }
  ctx.body = {
    code: code
  }
})
module.exports = router