
// 请求多个公共接口   baseURL: process.env.VUE_APP_API,

import request from '@/utils/request'

// /api
const getTest1 = () => {
  return request({
    url: '/article/label/search',
    // method: 'GET',
    method: 'GET',
    basePath: '/api'
  })
}

// /api1
const getTest2 = () => {
  return request({
    url: '/classroom/',
    method: 'GET',
    basePath: '/api1'
  })
}

// 100
const getTest3 = () => {
  return request({
    url: '/classroom/',
    method: 'GET',
    basePath: '/api2'
  })
}

export default {
  getTest1,
  getTest2,
  getTest3
}
