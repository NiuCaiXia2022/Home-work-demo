import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/article')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('../views/Form')
  },
  {
    path: '/formview',
    name: 'formview',
    component: () => import('../views/FormView.vue')
  }, {
    // Upload
    path: '/upload',
    name: 'upload',
    component: () => import('../views/Upload.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
