// https://www.jianshu.com/p/78dda0c32d0c

// https://www.cnblogs.com/jkchao/p/8022586.html

import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import { mutations} from './mutations'
import { actions } from './actions'
import { getters } from './getters'


Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
