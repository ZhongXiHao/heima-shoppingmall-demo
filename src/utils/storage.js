const INFO_KEY = 'heima_shoppingmall_info'

// Get user info from local storage
export const getInfo = () => {
  const defaultInfo = {
    token: '',
    userId: ''
  }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultInfo
}

// Save user info to local storage
export const setInfo = (userInfo) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(userInfo))
}

// Remove user info from local storage
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
