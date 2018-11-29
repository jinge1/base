import Vue from 'vue'
import App from './App'
import router from './router'

// dll已提取，直接在html中引入即可
// import './public/reset'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
