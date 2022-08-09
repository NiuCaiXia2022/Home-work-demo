
// 公告接口地址
import { apiConfig } from '../config/config'

// 消息提示
import exceptionMessage from '../config/exceptionMessage'

// 请求的路径+参数
import wxToPromise from './wx'


// class 封装 需要进行实例化  new Http
class Http {
  // static test(){
  //   console.log('测试static 静态不用实例(new Http)');
  // }
  static async request({ url, method = 'GET', data = {}, name = 'api1' }, options) {
    // console.log({...options});  console.log('name',name);
    wx.showLoading()

    try {
      const res = await wxToPromise('request', {
        url: apiConfig[name].baseURL + url,
        method,
        data,
        ...options
      })

      wx.hideLoading()

      if (res.statusCode < 400) {
        return res.data
      }
      // token过期
      if (res.statusCde === 401) {
        return
      }


      // 提示
      Http._showError(res.data.code, res.data.msg)

      return res

    } catch (error) {
      wx.hideLoading()
      _showError(-1)
      console.log(error);
    }



  }
  // static _showError(code, msg) {
  _showError(code, msg) {
    let title = ''
    title = exceptionMessage[code] || msg || '发生未知错误'
    wx.showToast({
      title,
      icon: 'none',
      duration: 3000
    })
  }

}


// const http=new Http
// Http.test()// 前面加 static 不用 new 一个实例对象

export default Http




// Promise 
// return new Promise((resolve,reject)=>{
//   wx.request({
//     url: apiConfig.baseURL + 'nav',
//     method: 'GET',
//     success: res => {
//       // console.log(res);
//       resolve(res)
//     },
//     fail: err => {
//       // console.log(err);
//       reject(err)
//     }
//   })
// })