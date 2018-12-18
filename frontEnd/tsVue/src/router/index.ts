import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
// ... 其他组件

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/about',
      component: (): any => import('../components/About.vue')
    },
    {
      path: '/test',
      component: (): any => import('../components/Test.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   setTimeout(()=>{
//     next()
//   }, 2000)
// })

export default router
