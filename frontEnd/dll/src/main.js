import Vue from 'vue'
import App from './App'
import router from './router'
import {aPromise, setRem} from './utils/url'

// dll已提取，直接在html中引入即可
import './public/reset'

// aPromise().then(res=>{
//   console.log('res: ', res)
// })

setRem()

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
