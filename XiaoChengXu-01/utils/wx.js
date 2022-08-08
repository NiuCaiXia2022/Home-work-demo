// 封装 promise

function wxToPromise(method='request', options={}) {

  return new Promise((resolve, reject) => {
    // 两种写法 options.success=resolve  options.fail = error => {}
    options.success = resolve
    options.fail = error => {
      reject(error)
    }
    wx[method](options)
  })
  // wx[method] 同等  wx.request // wx.request(options)
}

export default wxToPromise