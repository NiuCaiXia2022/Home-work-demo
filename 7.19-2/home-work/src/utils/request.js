// 导入axios
import axios from 'axios'

// 多个公共接口地址 .env.production

//  多个代理   解决
// [process.env.VUE_APP_API]: {
//   target: process.env.VUE_API_DEV_TARGET, // API服务器的地址
//     changeOrigin: true,
//       pathRewrite: {
//     [`^${process.env.VUE_APP_API}`]: ''
//   }
// },
// [process.env.VUE_APP_API1]: {
//   target: process.env.VUE_API_DEV_TARGET1, // API1 服务器的地址
//     changeOrigin: true,
//       pathRewrite: {
//     [`^${process.env.VUE_APP_API1}`]: ''
//   }
// }

// 请求多个公共接口   baseURL: process.env.VUE_APP_API,

// 创建axios实例对象
const service = axios.create({
  // baseURL: process.env.VUE_APP_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

// 统一了传参处理
const request = (options) => {
  // if (options.method.toLowerCase() === 'get') {
  //   options.params = options.data || {}
  // }
  // console.log(options)

  // 解决请求多个代理名称问题
  console.log(options.basePath)
  if (options.basePath) {
    // 公共请求接口
    service.defaults.baseURL = options.basePath
  }
  return service(options)
}

// 导出axios实例对象
export default request
