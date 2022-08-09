// 接口

import Http from '../utils/http'

class ShopModel extends Http{


  // 轮播图接口
  static getShopBanner(){
    return Http.request({
      url:'app/banner'
    },{
      header:{
        devicetype:'H5'
      }
    })
  }

  //  商品信息 http://weixin.itying.com/api/getProduct
  static getShopInfo(qcode){
    return Http.request({
      url:'getProduct',
      name:'api2',
      method:'GET',
      data:{
        qcode
      }
    })
  }
}

export default ShopModel