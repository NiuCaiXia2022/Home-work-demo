// vuex

// 本地
import Storage from '@/utils/storage.js'

//引入vue和vuex

import Vue from 'vue'

import Vuex from 'vuex'


Vue.use(Vuex)

// 本地的key值

const TOKEN_KEY = "token" // token
const USERINFO_KEY = "userInfo" //用户信息

// 全局变量定义
const store = new Vuex.Store({

	state: {
		token: Storage.getItem(TOKEN_KEY) || '',
		userInfo: Storage.getItem(USERINFO_KEY) || '{}',

	},
	mutations: {
		// 用户信息
		SETUSERINFO(state, userInfo) {
			state.userInfo = userInfo
			state.token = userInfo.token
			// console.log('222', state.userInfo);
			Storage.setItem(TOKEN_KEY, state.userInfo.token)
			Storage.setItem(USERINFO_KEY, JSON.stringify(state.userInfo))
		}

	},
	actions: {
		// 存用户信息
		setUserInfo({
			commit
		}, payload) {
			// console.log('存用户信息', payload);
			commit('SETUSERINFO', payload)
		}

	},
	getters: {

	},
	modules: {

	}
})

export default store
