// 封装接口

import Http from "@/utils/http.js"

// 类继承   static 可转静态(不转需要 new 一个实例化)
class UserModel extends Http {

	// 登录接口
	static getToLogin(data) {
		return Http.request({
			url: '/mobile/login',
			method: 'POST',
			data
		})
	}

	// 账号注册
	static getRegister(data) {
		return Http.request({
			url: '/mobile/reg',
			method: 'POST',
			data
		})
	}


	// 绑定手机号  /mobile/bind_mobile
	static getBindMobile() {
		return Http.request({
			url: '/mobile/bind_mobile',
			method: 'POST',
		})
	}

	// 退出登录 POST  /mobile/logout


	// 获取手机验证码  POST  /mobile/get_captcha

	// 绑定手机号 POST /mobile/bind_mobile

	//  找回密码 POST /mobile/forget

	//  修改资料 POST /mobile/update_info

	// 修改密码 POST /mobile/update_password


	//  微信app/小程序/H5登录  POST  /mobile/weixin_login

}

export default UserModel
