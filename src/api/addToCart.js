import request from '@/utils/request'

export const addToCartApi = (data) => {
  return request.post('/cart/add', {
    goodsId: data.goodsId,
    goodsNum: data.goodsNum,
    goodsSkuId: data.goodsSkuId

  })
}
