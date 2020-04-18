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

//获取文件信息
export const GetFile = (id) => {
  return request({
    url: '/file/getFile',
    params: {
      id
    }
  })
}
//重命名文件名
export const RenameFile = (data) => {
  return request({
    url: '/file/renameFile',
    method: 'post',
    data: data
  })
}

//下载文件
export const DownloadFile = (id) => {
  return request({
    url: '/file/download',
    params: {
      id
    }
  })
}
//分享文件
export const ShareFile = (data) => {
  return request({
    url: '/file/share',
    method: 'post',
    data: data
  })
}