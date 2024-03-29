import ShopModel from '../../model/shop'

// 跳转
import Navigate from '../../utils/navigate'

// 公共方法
import Common from '../../common/cart'

// 本地
import Storage from '../../utils/storage'

// pages/shop/shop.js
Page({
  // 轮播图接口
  async getBanner() {
    const res = await ShopModel.getShopBanner()
    // console.log('轮播图接口', res);
    // 需要setData 来赋值
    this.setData({
      bannerData: res.data
    })
  },

  // 商品信息
  async getShopCode(code) {

    if (this.data.status) { // 判断状态 true就跳转
      Navigate.navigateTo('/pages/order/order') // 跳转
      return
    }
    // console.log('code', code.detail);
    // 获取商品条形码
    const qcode = code.detail
    // 商品条形码 不存在  return
    if (!qcode) return

    try {
      // 调接口 报错商品信息
      const res = await ShopModel.getShopInfo(qcode)
      // console.log('商品信息 res', res);
      // 商品信息 不存在  return
      if (!res.success) return
      //  商品信息数据 
      const result = res.result
      //  商品信息数据   长度小于0   return
      if (result.length <= 0) return
      // 调方法存本地
      Common.addCard(result[0])

      // 跳转购物车 
      // 不需要全限 wx.navigateTo({})
      Navigate.navigateTo('/pages/cart/cart')

    } catch (error) {
      console.log(error);
    }
  },

  //  * 页面的初始数据
  data: {
    bannerData: [],// 轮播图列表
    cartList: [],// 本地购物车数据
    status: false,// 状态

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 默认调用 轮播图列表
    this.getBanner()



  },

  // 本地购物车数据
  getCartList() {

    const cartList = Storage.get('carts') // 保存   //本地购物车数据
    const status = cartList.length > 0 ? true : false
    console.log('本地购物车数据', cartList, cartList.length);
    this.setData({ //本地购物车数据 赋值
      cartList, status
    })

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
    // 购物车数据
    this.getCartList()
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