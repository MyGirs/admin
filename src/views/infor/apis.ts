import HttpClient from '@/axios'

// 值班记录列表查询
const getDutyList = (data): Promise<any> => {
  return new Promise((resolve, reject) => {
    return HttpClient({
      url: '/api/getDutyRecord',
      method: 'post',
      data
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 值班记录新增
const addDuty = (data): Promise<any> => {
  return new Promise((resolve, reject) => {
    return HttpClient({
      url: '/api/addDutyRecord',
      method: 'post',
      data
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 处置记录列表查询
const getDisposeList = (data): Promise<any> => {
  return new Promise((resolve, reject) => {
    return HttpClient({
      url: '/api/getDisposeRecord',
      method: 'post',
      data
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 处置记录新增
const addDispose = (data): Promise<any> => {
  return new Promise((resolve, reject) => {
    return HttpClient({
      url: '/api/addDisposeRecord',
      method: 'post',
      data
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 处置记录部门列表
const getOrgList = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    return HttpClient({
      url: '/api/getDep',
      method: 'get'
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 生产记录列表查询
const getProductList = (data): Promise<any> => {
  return new Promise((resolve, reject) => {
    return HttpClient({
      url: '/api/getProduceRecord',
      method: 'post',
      data
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 生产记录新增
const addProduct = (data): Promise<any> => {
  return new Promise((resolve, reject) => {
    return HttpClient({
      url: '/api/addProduceRecord',
      method: 'post',
      data
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 生产统计列表查询
const getStatisticsList = (data): Promise<any> => {
  return new Promise((resolve, reject) => {
    return HttpClient({
      url: '/api/getProduceStatistic',
      method: 'post',
      data
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 生产统计新增
const addStatistics = (data): Promise<any> => {
  return new Promise((resolve, reject) => {
    return HttpClient({
      url: '/api/addProduceStatistic',
      method: 'post',
      data
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export {
  getDutyList,
  addDuty,
  getDisposeList,
  addDispose,
  getOrgList,
  getProductList,
  addProduct,
  getStatisticsList,
  addStatistics
}
