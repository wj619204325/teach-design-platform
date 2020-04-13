import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import UserModel from '../dbs/models/users'
import Passport from '../utils/passport'
import Email from '../dbs/config'

let router = new Router({
  prefix: '/users'
})
let Store = new Redis().client
//注册
router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body;
  //验证是否填写信息
  if (!username || !password || !email || code) {
    ctx.body = {
      code: -1,
      msg: '请填写完整的信息'
    }
    return false
  }
  //验证邮箱是否已被注册
  let has_email = await UserModel.findOne({
    email
  })
  if (has_email !== null) {
    ctx.body = {
      code: -1,
      msg: '该邮箱已被注册'
    }
    return false
  }
  //验证用户名是否已被注册
  let has_username = await UserModel.findOne({
    username
  })
  if (has_username !== null) {
    ctx.body = {
      code: -1,
      msg: '该用户名已被注册'
    }
    return false
  }
  //验证验证号
  if (code) {
    //根据键为nodemail+emial的用户对应的验证码和验证码过期时间
    const saveCode = await Store.hget(`nodemail:${email}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${email}`, 'expire')
    //先检查验证码是否匹配，因为有可能该邮箱就没发送过验证码
    if (code === saveCode) {
      //验证码是否过期
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '验证码错误'
      }
      return false
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
    return false
  }
  //将该用户写入数据库
  let newUser = await UserModel.create({
    username,
    password,
    email
  })
  //注册成功
  if (newUser) {
    ctx.body = {
      code: 0,
      msg: '注册成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '数据库写入失败'
    }
  }
})
//给用户邮箱发送验证码
router.post('/verify', async (ctx, next) => {
  const {
    username,
    email
  } = ctx.request.body
  const saveExpire = await Store.hget(`nodemail:${email}`, 'expire')
  global.console.log("expire:", saveExpire)
  global.console.log("Now:", new Date().getTime())
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，10分钟内1次'
    }
    return false
  }
  //发送方信息
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: Email.smtp.port,
    //secure true则监听465端口,false则监听其他端口
    secure: true,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  //接收方信息
  let receiver = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: email,
    username: username
  }
  let mailOptions = {
    from: `教学设计软件平台<1120681908@qq.com>`,
    to: receiver.email,
    subject: '【验证码】',
    html: `您的验证码为：${receiver.code}（10分钟有效），请勿泄露给他人。
    
    如有问题，请通过邮件联系hanlong.liao@foxmail.com，邮件中请注明个人信息`
  }
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: `邮件发送失败：${err}`
      }
      return console.log('邮件发送失败：', err)
    } else {
      Store.hmset(`nodemail:${receiver.email}`, 'code', receiver.code, 'expire', receiver.expire, 'username', username)
      ctx.body = {
        code: 0,
        msg: '验证码已发送，可能会有延时，有效期10分钟'
      }
    }
  })

})
//登录
router.post('/signin', async (ctx, next) => {
  //假如已经在登录状态就不重复登录
  if (ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
      msg: '已经登录了'
    }
    return false
  }
  return Passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登陆成功',
          data: {
            user: user.username,
            email: user.email
          }
        }
        //passport中间件自带的登录函数（3x以前为ctx.req.login）
        return ctx.login(user)
      } else {
        ctx.body = {
          code: -1,
          msg: info
        }
      }
    }
    //【问题】为什么要next?
  })(ctx, next)
})


//退出登录
router.get('/logout', async (ctx, next) => {
  //passport自带的登出函数，会自动cookie的session
  await ctx.logout()
  //检查是否还在登录状态
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
      msg: '登出成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '登出失败'
    }
  }
})
//获取用户信息
router.get('/getUserInfo', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {
      username,
      email
    } = ctx.session.passport.user
    ctx.body = {
      code: 0,
      msg: '获取成功',
      data: {
        username,
        email,
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '未登录'
    }
  }
})

export default router