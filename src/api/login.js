// For all API calls related to log in and authentication
import request from '@/utils/request'

// 1. Get picture verification code
export const getPicCodeApi = () => {
  return request.get('/captcha/image')
}

// 2. Get SMS verification code
export const getMsgVerifyCodeApi = (data) => {
  return request.post('/captcha/sendSmsCaptcha', {
    header: { platform: 'h5' },
    form: {
      captchaCode: data.captchaCode,
      captchaKey: data.captchaKey,
      mobile: data.mobile
    }
  })
}

// 3. Log in by phone number and SMS verification code
export const loginApi = (data) => {
  return request.post('/passport/login', {
    header: { platform: 'h5' },
    form: {
      isParty: false,
      partyData: {},
      mobile: data.mobile,
      smsCode: data.smsCode
    }
  })
}
