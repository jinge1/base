import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
// import About from '../views/About.vue'
Vue.use(Router)

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/home',
        component: () => import('../views/Home')
      }, {
        path: '/about',
        component: () => import('../views/About')
      }, {
        path: '/',
        redirect: '/home'
      }
    ]
  })
}
