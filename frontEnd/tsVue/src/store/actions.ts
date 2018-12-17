import { StateType } from './StateType'
import { ActionTree } from 'vuex'
import { addNum } from './mutation-types'



export const actions: ActionTree<StateType, any> = {
  [addNum]({ state: StateType, commit }, data: number) {
    setTimeout(()=>{
      commit(addNum, data)
    }, 2000)
  }
}