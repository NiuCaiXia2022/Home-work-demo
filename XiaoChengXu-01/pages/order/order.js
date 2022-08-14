
// 本地
import Storage from "../../utils/storage"

// pages/order/order.js
Page({
  // 获取本地结算的商品
  getResultShop() {
    const carts = Storage.get('carts')
    const resultShop = JSON.parse(JSON.stringify(carts))
    // 两条数据就变成一条了
    resultShop.length = 1
    this.setData({
      carts,
      firstShop: resultShop,
      resultShop
    })

    this.handleComputedPrice()
  },

  // 点击展开
  handleOrderOpen() {
    const length = this.data.carts.length
    if (this.data.firstShop.length === length) {
      this.setData({
        firstShop: this.data.resultShop
      })
    } else {
      this.setData({
        firstShop: this.data.carts
      })
    }
  },

  // 商品总价
  handleComputedPrice() {
    let allPrice = 0
    this.data.carts.forEach(item => {
      allPrice += item.price * item.num
    })
    console.log('商品总价', allPrice);
    this.setData({
      balanceNum: allPrice, // 商品金额
      paymentNum: allPrice // 实际支付
    })
  },

  // 开关
  handleSwitchChange(event) {
    // console.log('开关', event);
    const value = event.detail.value //开关

    const price = this.data.balanceNum - this.data.balance  //差价
    if (value) { // 开启减扣   
      // 商品金额  跟余额  的大小  做出对应操作
      if (this.data.balanceNum > this.data.balance) { // 总价比余额多
        this.setData({
          payment: this.data.balance, // 余额 赋值 商品减扣
          paymentNum: price //差价
        })
      } else {  // 总价比余额少
        this.setData({
          payment: this.data.balanceNum, //商品减扣
          paymentNum: 0 //实际支付
        })
      }
    } else { //  关闭减扣  
      this.setData({
        payment:0,
        paymentNum:this.data.balanceNum
      })
    }
  },

  // 确认支付 跳转页面
  handleConfirmPay(){
    wx.navigateTo({
      url: '/pages/success/success',
    })
    // 清空本地
    Storage.remoteAll()

  },


  // 页面的初始数据
  data: {
    carts: [],//本地所有数据 2
    resultShop: [],//数据列表 1
    firstShop: [],// 数据的第一条
    balance: 4,//余额
    balanceNum: 0,//商品金额
    payment: 0,//商品减扣
    paymentNum: 0,//实际支付
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 默认调用
    this.getResultShop()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})