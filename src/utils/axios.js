import axios from 'axios'
import {
  Message
} from 'element-ui'
const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10 * 1000,
  headers: {}
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
    if (res.status === 200) {
      //code:0，则返回data
      if (data.code === 0) {
        Message({
          type: 'success',
          message: data.msg,
          duration: 2 * 1000
        })
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
    } else {
      console.log(`error!`)
    }
  },
  (err) => {
    // 对响应错误做点什么
    return Promise.reject(err);
  });
export default request