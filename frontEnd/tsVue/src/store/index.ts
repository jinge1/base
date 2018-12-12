
import Vue from 'vue'
import mutations from './mutations'
import actions from './actions'

// 需要使用 Vuex 的 interface 
import Vuex, { ActionTree, MutationTree } from 'vuex'

Vue.use(Vuex)

interface State {
  count: Number
}

const state: State = {
  count: 0
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})








