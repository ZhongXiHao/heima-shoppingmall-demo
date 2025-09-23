import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // Relative to user information(token, id)
      userInfo: getInfo()// Get from local storage
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setInfo(userInfo)// Save to local storage
      console.log(state.userInfo)
    }
  },
  actions: {},
  getters: {}
}
