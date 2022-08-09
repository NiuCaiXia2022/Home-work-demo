import ShopModel from '../../model/shop'

// 跳转
import Navigate from '../../utils/navigate'

// 公共方法
import Common from '../../common/cart'

// pages/shop/shop.js
Page({
  // 轮播图接口
  async getBanner() {
    const res = await ShopModel.getShopBanner()
    console.log('轮播图接口', res);
    // 需要setData 来赋值
    this.setData({
      bannerData: res.data
    })
  },

  // 商品信息
  async getShopCode(code) {
    console.log('code', code.detail);
     // 获取商品条形码
    const qcode = code.detail
     // 商品条形码 不存在  return
    if (!qcode) return

    try {
      // 调接口 报错商品信息
      const res = await ShopModel.getShopInfo(qcode)
      console.log('商品信息 res', res);
      // 商品信息 不存在  return
      if(!res.success) return
      //  商品信息数据 
      const result=res.result
      //  商品信息数据   长度小于0   return
      if(result.length<=0) return
      // 调方法存本地
      Common.addCard(result[0])

      // 跳转购物车 
      // 不需要全限 wx.navigateTo({})
      Navigate.navigateTo('/pages/cart/cart')

    } catch (error) {
      console.log(error);
    }
  },


  /**
   * 页面的初始数据
   */
  data: {
    bannerData: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 默认调用
    this.getBanner()

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