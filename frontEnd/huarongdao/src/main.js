import Vue from 'vue'
import App from './App'
import router from './router'
import './public/reset'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
