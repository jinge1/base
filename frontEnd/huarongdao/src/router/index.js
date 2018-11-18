import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/Index'

Vue.use(VueRouter)

const routes = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      component: Index,
    }, {
      path: '/test',
      component: () => import('../pages/Test')
    }, {
      path: '/test2',
      component: () => import('../pages/Test2')
    }, {
      path: '/test3',
      component: () => import('../pages/Test3')
    }, {
      // 404路由，该路由配置请当道最后
      path: '*',
      component: () => import('../pages/NoPath')
    }
  ]
})




export default routes
