import { ActionTree } from 'vuex'
import { addNum } from './mutation-types'



export const actions: ActionTree<any, any> = {
  [addNum]({ state, commit }) {
    setTimeout(()=>{
      commit(addNum, 2)
    }, 2000)
  }
}