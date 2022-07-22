import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import TestApi from './api/test'

Vue.prototype.$axios = request

// TestApi.getTest1().then(res => {
//   console.log(res)
// })
// TestApi.getTest2().then(res => {
//   console.log(res)
// })

Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
