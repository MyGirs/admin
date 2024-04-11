import HttpClient from '@/axios'
export const getRiskHazardsApi = (params): Promise<any> => {
  return HttpClient({
    url: '/getRiskHazards',
    method: 'get',
    params
  })
}

export const addRiskHazardsApi = (data) => {
  console.log(data)
  return HttpClient({
    url: '/addRiskHazards',
    method: 'post',
    data
  })
}

export const updatedRiskHazardsApi = (data) => {
  return HttpClient({
    url: '/updateRiskHazards',
    method: 'put',
    data
  })
}
