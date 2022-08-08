import Http from '../utils/http'

// 子 TestModel  类继承  extends   父 Http
class TestModel extends Http {

  // class类 封装  接口


  // nav
  static getNav() {
    return Http.request({
      url: 'app/nav',
      method: 'GET',
      data: {},
      name: 'api1'
    })
  }

  // banner
  // static getBanner() {
  //   return Http.request({
  //     url: 'focus',
  //     method: 'GET',
  //     data: {},
  //     // name: 'api2'
  //   })
  // }
}

export default TestModel