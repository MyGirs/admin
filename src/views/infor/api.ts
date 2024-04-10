import HttpClient from '@/axios'
export const getProduceStatisticApi = (data): Promise<any> => {
  return Promise.resolve({
    code: 200,
    data: [
      {
        morningPlan: '早计划',
        morningSituation: '早完成情况早完成情况早完成情况早完成情况早完成情况早完成情况早完成情况',
        centrePlan: '中班计划',
        centreSituation: '中班完成情况',
        eveningPlan: '晚班计划',
        eveningSituation: '晚班完成情况',
        totalPlan: '合计计划',
        totalSituation: '合计完成情况'
      }
    ],
    total: 100
  })
  // return HttpClient({
  //   url: '/api/getProduceStatistic,
  //   method: 'post',
  //   data
  // })
}
export const addProduceStatisticApi = (data): Promise<any> => {
  return Promise.resolve({
    code: 200,
  })
  // return HttpClient({
  //   url: '/api/addProduceStatistic,
  //   method: 'post',
  //   data
  // })
}