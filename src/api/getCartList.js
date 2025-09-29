import request from '@/utils/request'

export const getCartListApi = () => {
  return request.get('/cart/list')
}
