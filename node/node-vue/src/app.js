import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'

Vue.mixin({
  beforeMount () {
    const { serverRequest } = this.$options
    if (serverRequest) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = serverRequest(this.$store)
    }
  }
})

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export default function createApp () {
  const router  = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
