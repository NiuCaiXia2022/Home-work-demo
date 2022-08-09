// component/i-button/i-button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  // 组件方法在methods
  methods: {
    handleScanCode(){
      // 扫码功能
      wx.scanCode({
        onlyFromCamera: true,// 只允许从相机扫码
        success:res=>{
          console.log(1,res.result);
          // 子传父
          this.triggerEvent('getCodeInfo',res.result)
        },
        fail:err=>{
          console.log(2,err);
        },
        // complete:a=>{} 不管成功或失败都会返回
      })
    }
  }
})
