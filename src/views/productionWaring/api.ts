import HttpClient from '@/axios'

export const getProductionWaringApi = (data) => {
  HttpClient({
    url: '/api/getProductionWaring',
    method: 'post',
    data
  })
}
