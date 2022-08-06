import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 字体图标
import './assets/font/iconfont.css'

// 全局样式
import './assets/css/globall.scss'

// axios
import axios from 'axios'

// 导入 web 对服务端webSocket的连接
import SocketService from './utlis/socket_servie'
SocketService.Instance.connect()
// 挂载在vue上  this.$socket
Vue.prototype.$socket = SocketService.Instance

// 请求基准路径配置
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
// 将axios 挂载vue的原型上
// 在组件中 可以 this.$http 使用
Vue.prototype.$http = axios

// 将全局echarts对象 挂载在 vue的原型上
// 在组件中 可以 this.$echarts 使用
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 1、(后端接口) --
// 2、(在视频 51) --
// 3、(第三天文件的代码文件加) --
// 4、(koa_server 文件) --
// 5、(使用 node app.js 启动)

// 86
