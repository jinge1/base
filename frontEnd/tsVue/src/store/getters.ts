import { StateType } from './StateType'
import { GetterTree } from 'vuex'

export const getters: GetterTree<StateType, any> = {
  msg: ({count}: StateType) => `count is ${count}`
}