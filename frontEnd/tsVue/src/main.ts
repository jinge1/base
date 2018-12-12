
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import router from './router'
import store from './store'
import App from './app.vue'

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
