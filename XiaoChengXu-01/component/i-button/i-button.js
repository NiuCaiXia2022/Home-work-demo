// component/i-button/i-button.js

// 本地
import Storage from '../../utils/storage'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status: Boolean,//状态
    count: String, // 购物车数据 的长度
    // noEmptyStatusUrl:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    emptyStatusUrl: '/images/cart_index.png',// 不为空路径
    noEmptyStatusUrl: '/images/qrcode.png', // 为空路径
    cartList: 0 // 购物车数据
  },

  /**
   * 组件的方法列表
   */
  // 组件方法在methods
  methods: {
    // 点击事件  扫码功能
    handleScanCode() {
      console.log('扫码功能', this.data.status);
      if (this.data.status) {
        // 子传父
        this.triggerEvent('getCodeInfo')
        return
      }
      // 扫码功能
      wx.scanCode({
        onlyFromCamera: true,// 只允许从相机扫码
        success: res => {
          // console.log(1,res.result);
          // 子传父
          this.triggerEvent('getCodeInfo', res.result)
        },
        fail: err => {
          console.log(2, err);
        },
        // complete:a=>{} 不管成功或失败都会返回
      })
    },

  }
})
