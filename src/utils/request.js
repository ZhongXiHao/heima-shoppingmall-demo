// Packaging axios
import axios from 'axios'
import { Toast } from 'vant'
// Create an axios instance
// Goodness: Each request has its own configuration
const request = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api', // Base URL: The base URL for all requests
  timeout: 5000, // Timeout: Request timeout duration
  headers: { platform: 'h5' } // Headers: Custom headers for each request
})

// Customize request interceptors
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // Turn on loading indicator, and disabled background interaction
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // Disable background interaction
    duration: 0// Keep loading
  })
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Customize response interceptor
request.interceptors.response.use(function (response) {
  const res = response.data
  // Do something with response data
  if (res.status !== 200) {
    // Show warning message
    Toast(res.message ? res.message : 'Network Error')
    // If the response status code is not 200, it indicates a failure
    return Promise.reject(res.message)
  } else {
    Toast.clear()
  }
  return res
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default request
