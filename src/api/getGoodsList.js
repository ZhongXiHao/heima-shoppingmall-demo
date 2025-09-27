import request from '@/utils/request'

export const getSearchListApi = (params) => {
  return request.get('/goods/list', {
    params: {
      categoryId: params.categoryId,
      goodsName: params.goodsName,
      page: params.page
    }

  })
}
