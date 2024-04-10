import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
const request = (config: AxiosRequestConfig) => {
  if (!config.headers) {
    config.headers = {}
  }
  config.headers['Authorization'] = '123456789'
  config.headers['platform_code'] = '8ff998186633642c09a7767130e62b50'
  config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
  return config
}
export const resSuccess = async (response: AxiosResponse) => {
  const { data, config } = response
  // code 码值处理
  if (data.code === '000000' || data.code === '0' || data.code === 200 || data.code === 0) {
    // 正常请求
    return data
  } else if (
    (config.url === '/file/download' && response.status === 200) ||
    (response.data.type == 'application/vnd.ms-excel' && response.status === 200)
  ) {
    return response
  } else {
    ElMessage.error({
      message: data.msg || data.message || data.description || data.code || 'Error',
      duration: 5 * 1000
    })
    return Promise.reject(data)
  }
}
export const responseError = (error: AxiosError) => {
  ElMessage.error({
    message: error.message,
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
const HttpClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL
})

HttpClient.interceptors.request.use(
  (config) => {
    const value: any = request(config)
    return value
  },
  (error) => {
    return Promise.reject(error)
  }
)
HttpClient.interceptors.response.use(resSuccess, responseError)
export interface ResponseData<T = any> {
  code: number
  data?: T
  datas?: T
  msg: string
}
export default HttpClient
