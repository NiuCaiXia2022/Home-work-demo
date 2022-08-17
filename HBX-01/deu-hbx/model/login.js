// 封装接口

import Http from "@/utils/http.js"

// 类继承   static 可转静态(不转需要 new 一个实例化)
class Login extends Http {

	// 登录接口
	static getToLogin(data) {
		return Http.request({
			url: 'mobile/login',
			method: 'POST',
			data
		})
	}

	// 账号注册
	static getRegister(data) {
		return Http.request({
			url: 'mobile/reg',
			method: 'POST',
			data
		})
	}


}

export default Login
