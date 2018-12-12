import { ActionTree, Action } from 'vuex'
import {
  ADD
} from './mutation-types'


const add: Action<any, any> = ({ commit }, payload) => {
  commit(ADD, payload);
};

const actions: ActionTree<any, any> = {
  add
};
export default actions;