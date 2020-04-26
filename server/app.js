require('babel-core/register');
require('babel-polyfill');
import Koa from 'koa'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import dbConfig from './dbs/config'
import file from './routes/file'
import users from './routes/users'
import session from 'koa-generic-session'
import passport from './utils/passport'
import Redis from 'koa-redis'
const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}


const app = new Koa()
// error handler
onerror(app)
app.keys = ['tsp', 'keyskeys']
const session_config = {
  /**  cookie的key。 (默认是 koa:sess) */
  key: 'tsp', //前缀:加在key前面
  prefix: 'tsp:uid',
  /**  session 过期时间，以毫秒ms为单位计算 。*/
  maxAge: 60 * 60 * 1000 * 2,
  /** 自动提交到响应头。(默认是 true) */
  autoCommit: true,
  /** 是否允许重写 。(默认是 true) */
  overwrite: true,
  /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
  httpOnly: true,
  /** 是否签名。(默认是 true) */
  signed: true,
  /** 是否每次响应时刷新Session的有效期。(默认是 false) */
  rolling: true,
  /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
  renew: false,
  store: new Redis()
}
app.use(session(session_config))
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(resolve('public')))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//跨域
if (process.env.NODE_ENV !== 'production') {
  const cors = require('koa2-cors')
  app.use(cors({
    origin: (ctx) => {
      return 'http://localhost:8080'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }));

}
app.use(passport.initialize())
app.use(passport.session())
//连接mongodb
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
// routes
const allowPath = ['/users/signup', '/users/signin']
// 请求拦截
function Interceptor(ctx, next) {
  let url = ctx.request.url
  global.console.log("正在访问：", url)
  // 是否在白名单
  if (allowPath.indexOf(url) !== -1) {
    return next()
  }
  // 是否在登陆状态
  if (ctx.isAuthenticated()) {
    return next()
  }
  ctx.status = 401
}
app.use(async (ctx, next) => {
  await Interceptor(ctx, next)
})
app.use(users.routes(), users.allowedMethods())
app.use(file.routes(), file.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app