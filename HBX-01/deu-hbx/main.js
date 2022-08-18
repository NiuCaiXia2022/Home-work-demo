import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

//  注册到全局 lodash
import _ from 'lodash'
Vue.prototype.lodash = _

// main.js 挂载 Vuex
import store from "@/store/index"
// Vue.prototype.$store = store

App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
