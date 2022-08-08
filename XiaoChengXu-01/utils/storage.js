// 本地封装



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

}

export default Storage