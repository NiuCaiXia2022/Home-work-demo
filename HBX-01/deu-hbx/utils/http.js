// 封装请求

import Config from '@/config/config.js'

// 自定义信息提示
import exceptionMessage from '@/config/exception.js'

// ES6创建class 类   static 可转静态(不转需要 new 一个实例化)
class Http {

	// 请求拦截
	static async _beforeRequest(config) {

		config.header = {
			appid: Config.appid
		}

		// 还可以做权限处理
		// console.log('Config', config);
		return config
	}

	//  http 请求   static request(options) {
	static async request({
		url,
		method,
		data,
		header,
		...options
	}) { // 通过对象接收

		// 调用 请求拦截函数
		const config = await Http._beforeRequest({
			url,
			method,
			data,
			header,
			...options
		})
		// 基准地址
		config.url = Config.baseURL + config.url
		//  请求
		const response = await uni.request(config) // return res[1].data
		// 调用  响应拦截函数
		return await Http._beforeResponse(response)
	}

	// 响应拦截
	static async _beforeResponse(response) {
		// console.log('响应拦截', response);

		const [ // 解构赋值  [] 可以用
			error,
			res
		] = response

		// console.log('123', error, res);

		// 请求失败
		if (res.statusCode !== 200 || res.data.msg === 'fail') {
			// 错误的 信息提示
			Http._showError(res.statusCode, res.data.data)
		}

		// token过期

		return res.data.data
	}

	// 错误的 信息提示
	static _showError(code, res) {
		console.log('信息提示', res);
		let title = ''
		title = exceptionMessage[code] || msg || '发生未知错误'
		uni.showToast({
			title,
			icon: 'none',
			duration: 2000
		})

	}

}




export default Http

// uni.request({
// 	url: '',
// 	method: '',
// 	data: {}，
// 	success: res => {},
// 	fail: err => {},
// 	complete: () => {}
// })
