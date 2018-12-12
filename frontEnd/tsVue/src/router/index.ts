import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
// ... 其他组件

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/index',
    component: Index
  },
  {
    path: '/about',
    component: (): any => import('../components/About.vue')
  }
  ]
})