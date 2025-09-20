// Packaging axios
import axios from 'axios'

// Create an axios instance
// Goodness: Each request has its own configuration
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api', // Base URL: The base URL for all requests
  timeout: 5000, // Timeout: Request timeout duration
  headers: { platform: 'h5' } // Headers: Custom headers for each request
})

// Customize request interceptors
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Customize response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default instance
