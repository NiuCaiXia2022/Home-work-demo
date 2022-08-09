
// 公共接口配置
const apiConfig = {
  'api1': {
    baseURL: 'https://admin.hxwendeng.com/api/'
  },
  'api2': {
    baseURL: 'http://weixin.itying.com/api/'
  },
}


// 白名单
const pathWitch = ['/login', '/404', '/401', 'settings']


// 存储字段
const field = {
  loginCredentials: 'token', //token
  userInfoKey: 'userInfo'// 用户信息
}

export { apiConfig, pathWitch, field }