import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import router from '@/router'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://39.97.255.236:3000',
  timeout: 10 * 1000,
  headers: {},
  //没有设置withCredentials 浏览器不会保存服务器传过来的cookie
  withCredentials: true
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use((res) => {
    const data = res.data
    // 对响应数据做点什么
    switch (res.status) {
      case 200:
        //code:0，则返回data
        if (data.code === 0) {
          if (data.msg) {
            Message({
              type: 'success',
              message: data.msg,
              duration: 2 * 1000
            })
          }
          return Promise.resolve(data.data)
        }
        //code:-1，则返回后端返回的报错信息msg
        else {
          Message({
            type: 'error',
            message: data.msg,
            duration: 3 * 1000,
            showClose: true
          })
          return Promise.reject(data.msg)
        }
        break;
      case 401:
        // 返回 401 (未授权) 清除 session 并跳转到登录页面
        MessageBox.alert('您未登录或登录已超时，请重新登录。', '提示', {
          confirmButtonText: '确定',
          showClose: false,
          callback: action => {
            store.commit('LOGOUT')
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }
        })
        break;
      default:
        console.log('服务器出错，请稍后重试！')
        alert('服务器出错，请联系管理员！')
    }
  },
  (err) => {
    // 对响应错误做点什么
    return Promise.reject(err);
  });
export default request