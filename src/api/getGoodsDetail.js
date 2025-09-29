import request from '@/utils/request'

export const getGoodsDetailApi = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId: goodsId
    }
  })
}
