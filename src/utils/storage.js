const USER_INFO_KEY = 'heima_shoppingmall_user_info'
const SEARCH_HISTORY_KEY = 'heima_shoppingmall_search_history'
// Get user info from local storage
export const getUserInfo = () => {
  const defaultInfo = {
    token: '',
    userId: ''
  }
  const result = localStorage.getItem(USER_INFO_KEY)
  return result ? JSON.parse(result) : defaultInfo
}

// Save user info to local storage
export const setUserInfo = (userInfo) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}

// Remove user info from local storage
export const removeUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY)
}

// Get search history from local storage
export const getSearchHistory = () => {
  const result = localStorage.getItem(SEARCH_HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

// Save search history to local storage
export const setSearchHistory = (history) => {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history))
}
