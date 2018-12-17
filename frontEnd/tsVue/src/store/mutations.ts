import { StateType } from './StateType'
import { MutationTree } from 'vuex'
import {addNum} from './mutation-types'



export const mutations: MutationTree<StateType> =  {
  [addNum](state: StateType, num: number = 1){
    let {count} = state
    state.count = count + num
  }
}