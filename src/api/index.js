import request from '@/utils/axios'
//注册
export const Register = (data) => {
  return request({
    url: '/users/signup',
    method: 'post',
    data: data
  })
}
//发送邮件
export const SendMail = (data) => {
  return request({
    url: '/users/verify',
    method: 'post',
    data: data
  })
}
//登录
export const Login = (data) => {
  return request({
    url: '/users/signin',
    method: 'post',
    data: data
  })
}
//获取用户信息
export const GetUserInfo = () => {
  return request({
    url: '/users/getUserInfo'
  })
}

//退出登录
export const Logout = () => {
  return request({
    url: '/users/logout'
  })
}