import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {
    getUserToken: state => state.User.userInfo.token
  },
  mutations: {},
  actions: {},
  modules: {
    User
  }
})
