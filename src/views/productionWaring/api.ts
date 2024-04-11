import HttpClient from '@/axios'

//http://a01.xmbygy.com/api/services/app/YieldSJH/getProductionWaring
export const getProductionWaringApi = (params) => {
  HttpClient({
    url: '/getProductionWaring',
    method: 'get',
    params,
    baseURL: 'http://a01.xmbygy.com/api/services/app/YieldSJH'
  })
}
