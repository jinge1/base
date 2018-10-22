/* store.js */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default function createStore() {
  let store = new Vuex.Store({
    state: {
      homeInfo: '',
      aboutInfo: ''
    },
    actions: {
      getHomeInfo({commit}) {
        return axios.get('http://localhost:8081/api/getHomeInfo').then((res) => {
          commit('setHomeInfo', res.data)
        })
      },
      getAboutInfo({commit}) {
        return axios.get('http://localhost:8081/api/getAboutInfo').then((res) => {
          commit('setAboutInfo', res.data)
        })
      }
    },
    mutations: {
      setHomeInfo(state, res) {
        state.homeInfo = res
      },
      setAboutInfo(state, res){
        state.aboutInfo = res
      }
    }
  })

  return store
}
