// 封装跳转  

import { pathWitch ,field} from '../config/config'

// 不需要权限
const navigateTo = (url) => {
  wx.navigateTo({
    url
  })
}

// 需要登录后能跳转
const navigateAuth = (url) => {
  // 白名单 筛选
  const path = pathWitch.includes(url)
  if (path) {
    wx.navigateTo({
      url: 'url',
    })
    return
  }

  // token
  const token = wx.getStorageSync(field.loginCredentials)
  if (token) {
    wx.navigateTo({
      url: 'url',
    })
    return
  }
  wx.navigateTo({
    url: '/pages/login/login',
  })
}


export default {navigateTo,navigateAuth}