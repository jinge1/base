import { MutationTree } from 'vuex'
import { addNum, changeName} from './mutation-types'



export const mutations: MutationTree<any> =  {
  [addNum](state){
    let {num} = state
    state.num = num + 1
  }
}