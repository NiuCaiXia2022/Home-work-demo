// 本地封装

import {field} from '../config/config'


class  Storage{

  // 存
  static set(key, value) {
    wx.setStorageSync(key, value)
  }

  // 取
  static get(key) {
   return wx.getStorageSync(key)
  }

  // 删
  static remote(key) {
    wx.remoteStorageSync(key)
  }

  // 清空
  static remoteAll() {
    wx.clearStorageSync()
  }


  // 存token
  static setToken(token){
    wx.setStorageSync(field.loginCredentials, token)
  }

  // 存用户信息
  static setUserInfo(userInfo){
    wx.setStorageSync(field.userInfoKey, userInfo)
  }

}

export default Storage