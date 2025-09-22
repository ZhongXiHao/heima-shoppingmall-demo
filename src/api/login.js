// For all API calls related to log in and authentication
import request from '@/utils/request'

// 1. Get picture verification code
export const getPicCodeApi = () => {
  return request.get('/captcha/image')
}

export const getMsgVerifyCodeApi = (data) => {
  return request.post('/captcha/sendSmsCaptcha', {
    headers: { platform: 'h5' },
    form: {
      captchaCode: data.captchaCode,
      captchaKey: data.captchaKey,
      mobile: data.mobile
    }
  })
}
