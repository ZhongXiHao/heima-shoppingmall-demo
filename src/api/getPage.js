import request from '@/utils/request'

export const getHomePageApi = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
