// For all API calls related to log in and authentication
import instance from '@/utils/request'

// 1. Get picture verification code
export const getPicCodeApi = () => {
  return instance.get('/captcha/image')
}
