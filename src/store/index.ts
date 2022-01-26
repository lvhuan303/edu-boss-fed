import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null'),
    isCollapse: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      window.localStorage.setItem('user', payload)
    },
    setCollapse (state, payload) {
      state.isCollapse = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
