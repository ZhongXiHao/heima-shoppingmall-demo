import request from '@/utils/request'

export const addToCartApi = (data) => {
  return request.post('/cart/add', {
    goodsId: data.goodsId,
    goodsNum: data.goodsNum,
    goodsSkuId: data.goodsSkuId

  })
}

export const getCartListApi = () => {
  return request.get('/cart/list')
}

export const updateCartApi = (data) => {
  return request.post('/cart/update', {

    goodsId: data.goodsId,
    goodsNum: data.goodsNum,
    goodsSkuId: data.goodsSkuId

  })
}

export const deleteGoodsApi = (data) => {
  return request.post('/cart/clear', {
    cartIds: data
  })
}
