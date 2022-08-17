// 封装接口

import Http from "@/utils/http.js"

// 类继承   static 可转静态(不转需要 new 一个实例化)

class IndexModel extends Http {

	// 首页接口
	static getMobileIndex() {
		return Http.request({
			url: '/mobile/index',
			method: 'GET',
		})
	}

	// 获取可用优惠券列表  flashsale
	static getMobileCoupon() {
		return Http.request({
			url: '/mobile/coupon',
			method: 'GET',
		})
	}

	// 获取拼团列表   秒杀列表  
	static getGroupFlashsale(type, data) {
		return Http.request({
			url: '/mobile/' + type,
			method: 'GET',
			data
		})
	}


	// // 获取可用拼团列表  
	// static getMobileGroup() {
	// 	return Http.request({
	// 		url: '/mobile/group',
	// 		method: 'GET',
	// 	})
	// }
	// // 获取可用秒杀列表  
	// static getMobileflashsale() {
	// 	return Http.request({
	// 		url: '/mobile/flashsale',
	// 		method: 'GET',
	// 	})
	// }
}


export default IndexModel
