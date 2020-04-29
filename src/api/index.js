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
// 获取用户的文件列表
export const GetFileList = (username) => {
  return request({
    url: '/file/getFileList',
    params: {
      username
    }
  })
}
// 新建一个教案
export const CreateOneFile = (data) => {
  return request({
    url: '/file/addFile',
    method: 'post',
    data: data
  })
}

// 获取某一教案
export const GetOneFile = (id) => {
  return request({
    url: '/file/getFile',
    params: {
      id
    }
  })
}
//修改某一模块
export const UpdateModule = (data) => {
  return request({
    url: '/file/updateFile',
    method: 'post',
    data: data
  })
}

//另存为模板/教案
export const ChangeFileType = ({
  id,
  type
}) => {
  return request({
    url: '/file/changeType',
    params: {
      id,
      type
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

//分享文件
export const ShareFile = (data) => {
  return request({
    url: '/file/share',
    method: 'post',
    data: data
  })
}
// 上传文件
export const UploadFiles = ({
  fileData,
  id
}) => {
  return request({
    url: '/file/upload',
    method: 'post',
    data: fileData,
    params: {
      id
    }
  })
}

// 获取用户文件列表
export const GetEvalFileList = (id) => {
  return request({
    url: '/file/getEvalFiles',
    params: {
      id
    }
  })
}