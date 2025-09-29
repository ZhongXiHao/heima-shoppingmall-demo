import request from '@/utils/request'

export const getCommentsApi = (params) => {
  return request.get('/comment/listRows',
    {
      params: params
    })
}
