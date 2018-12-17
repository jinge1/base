import Vue from 'vue'
import Vuex from 'vuex'
// import { app } from './modules/app'
// import { jiro } from './modules/jiro'
import { state } from './state'
import { mutations} from './mutations'
import { counter } from './modules/counter'


Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  // modules: {
  //   // app,
  //   // jiro,
  //   counter
  // }
})
