import { getUserInfo, setUserInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // Relative to user information(token, id)
      userInfo: getUserInfo()// Get from local storage
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setUserInfo(userInfo)// Save to local storage
      console.log(state.userInfo)
    }
  },
  actions: {},
  getters: {}
}
