import { MutationTree } from 'vuex'
import {
  ADD
} from './mutation-types'


const mutations: MutationTree<any> = {
  [ADD](state) {
    state.count = state.count + 1
  }
};

export default mutations;