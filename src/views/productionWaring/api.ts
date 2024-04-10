import HttpClient from '@/axios'

export const getProductionWaringApi = (data) => {
  return Promise.resolve({
    code: 200,
    data: {
      list: [
        {
          time: '2012',
          classes: 1,
          groups: '08:00-16:00',
          startTotal: 30,
          endTotal: 50,
          weight: 50
        }
      ],
      total: 31,
      waring: {
        monthlyTarget: 1000,
        monthlyActual: 1200,
        ratio: 1.2
      }
    }
  })
  // HttpClient({
  //   url: '/api/getProductionWaring',
  //   method: 'post',
  //   data
  // })
}
