import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import Cart from '@/store/modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {
    getUserToken: state => state.User.userInfo.token
  },
  mutations: {},
  actions: {},
  modules: {
    User,
    Cart
  }
})
