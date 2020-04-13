require('babel-core/register');
require('babel-polyfill');
import Koa from 'koa'
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import dbConfig from './dbs/config'
import index from './routes/index'
import users from './routes/users'
import session from 'koa-generic-session'
import passport from './utils/passport'
import Redis from 'koa-redis'
import cors from 'koa2-cors'

import pv from './middleware/koa-pv'
const app = new Koa()
// error handler
onerror(app)
app.keys = ['tsp', 'keyskeys']
app.use(session({
  //cookie key
  key: 'tsp',
  //前缀:加在key前面
  prefix: 'tsp:uid',
  store: new Redis()
}))
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(pv())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//跨域
app.use(cors({
  origin: function (ctx) {
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(passport.initialize())
app.use(passport.session())
//连接mongodb
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app