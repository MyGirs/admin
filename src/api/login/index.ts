import request from '@/axios'
import type { UserType } from './types'

interface RoleParams {
  roleName: string
}

export const loginApi = (data: UserType): Promise<IResponse<UserType>> => {
  return Promise.resolve({
    code: 200,
    data: {
      username: data.username,
      password: data.password,
      role: 'admin',
      roleId: '1',
      permissions: ['*.*.*']
    }
  })
  //return request.post({ url: '/mock/user/login', data })
}

export const loginOutApi = (): Promise<IResponse> => {
  return Promise.resolve({
    code: 200,
    data: null
  })
}

export const getUserListApi = ({ params }: AxiosConfig) => {
  return request.get<{
    code: string
    data: {
      list: UserType[]
      total: number
    }
  }>({ url: '/mock/user/list', params })
}

export const getAdminRoleApi = (
  params: RoleParams
): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return Promise.resolve({
    code: 200,
    data: []
  })
  // return request.get({ url: '/mock/role/list', params })
}

export const getTestRoleApi = (params: RoleParams): Promise<IResponse<string[]>> => {
  return request.get({ url: '/mock/role/list2', params })
}
