// pages/cart/cart.js


// 本地
import Storage from '../../utils/storage'

// 接口
import ShopModel from '../../model/shop'

// 公共方法
import Common from '../../common/cart'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],//购物车列表
    total: null,//总价格
  },

  // 获取本地数据
  getCartList() {
    const cartList = Storage.get('carts')
    // console.log('cartList', cartList);

    if (cartList.lenght < 0) return

    // 赋值
    this.setData({
      cartList
    })

  },

  // 加数量
  handleAddNum(event) {
    // console.log('add',event.currentTarget.dataset.index);
    this.handleComputedNum(event.currentTarget.dataset.index, 'add')
  },

  // 减数量
  handleDelNum(event) {
    // console.log('add',event.currentTarget.dataset.index);
    this.handleComputedNum(event.currentTarget.dataset.index, 'del')
  },

  // 数量 计算
  handleComputedNum(index, value) {
    // console.log('计算1', index, value);
    let num = this.data.cartList[index].num // 数量

    if (value === 'del') {  // 减
      if (num <= 1) {
        this.handleModalAction(index)
        return
      } else {
        num--
      }
    } else if (value === 'add') {  // 加
      num++
    }

    // 更新值 // console.log('this.data.cartList[index].num-1', this.data.cartList[index].num);
    this.data.cartList[index].num = num

    this.setData({  // 重新赋值
      cartList: this.data.cartList
    })

    // 存本地 // console.log(this.data.cartList);
    Storage.set('carts', this.data.cartList)


    this.handleTotalNum() // 总价钱
  },


  // 总价钱
  handleTotalNum() {

    let total = 0 //总数

    const cartList = this.data.cartList
    cartList.forEach((item, index) => {

      const price = this.data.cartList[index].price // 单价
      const num = this.data.cartList[index].num // 数量

      total += price * num
    })
    // console.log('总数', total.toFixed(2));

    this.setData({
      total: total.toFixed(2)
    })
  },

  // 数量一个提示框
  handleModalAction(index) {
    wx.showModal({
      title: '提示',
      content: "要删除此商品麽？？？",
      success: (res) => {
        if (res.confirm) {

          this.data.cartList.splice(index, 1) // 删除
          this.handleTotalNum() // 总价钱

          this.setData({  // 重新赋值
            cartList: this.data.cartList
          })
          // 存本地 // console.log(this.data.cartList);
          Storage.set('carts', this.data.cartList)
        } else if (res.cancel) {
          console.log('取消');
        }
      },
    })

  },


  // 继续添加
  handleAdd() {
    wx.scanCode({
      onlyFromCamera: true,//只能相机
      success: (res) => {
        console.log('继续添加', res);
        const code = {
          detail: res.result
        }
        this.getShopCode(code)
      }
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
      // console.log('商品信息 res', res);
      // 商品信息 不存在  return
      if (!res.success) return
     
      const result = res.result  //  商品信息数据 
     
      if (result.length <= 0) return  //  商品信息数据   长度小于0   return
      
      Common.addCard(result[0]) // 调方法存本地

      this.getCartList() // 调用默认

      this.handleTotalNum() // 总价钱

    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.getCartList()
    this.handleTotalNum()

    // 写  头部的titile 2种
    // 1 在页面.json定义  "navigationBarTitleText": "购物车",
    // 2
    // wx.setNavigationBarTitle({
    //   title: '购物车',
    // })

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