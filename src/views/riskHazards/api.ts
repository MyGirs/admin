import HttpClient from '@/axios'
export const getRiskHazardsApi = (params): Promise<any> => {
  return HttpClient({
    url: '/api/getRiskHazards',
    method: 'get',
    params
  })
}

export const addRiskHazardsApi = (data) => {
  return HttpClient({
    url: '/api/addRiskHazards',
    method: 'post',
    data
  })
}

export const updatedRiskHazardsApi = (data) => {
  return HttpClient({
    url: '/api/updateRiskHazards',
    method: 'put',
    data
  })
}
