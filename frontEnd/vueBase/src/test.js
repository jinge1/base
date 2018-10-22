import Vue from 'vue'
import App from './App'
import router from './router'


console.log('It is ok!')
function pro(){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve('It is done!')
    }, 3000)
  })
}

async function asy(){
  let a = await pro()
  console.log(a)
}

asy()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
