import HttpClient from '@/axios'
export const getRiskHazardsApi = (data): Promise<any> => {
  return Promise.resolve({
    code: 200,
    data: [
      {
        points: '监测点位',
        position: '位置',
        time: '时间'
      }
    ],
    total: 100
  })
  // return HttpClient({
  //   url: '/api/getRiskHazards',
  //   method: 'post',
  //   data
  // })
}

export const addRiskHazardsApi = (data) => {
  return Promise.resolve({
    code: 200
  })
  // return HttpClient({
  //   url: '/api/addRiskHazards',
  //   method: 'post',
  //   data
  // })
}

export const updatedRiskHazardsApi = (data) => {
  return Promise.resolve({
    code: 200
  })
  // return HttpClient({
  //   url: '/api/updateRiskHazards',
  //   method: 'post',
  //   data
  // })
}