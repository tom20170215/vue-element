import * as API from './'

export default {
  // 登录
  login: params => {
    return API.POST('/api/v1/users/login', params)
  },
  // 登出
  logout: params => {
    return API.GET('/api/v1/users/logout', params)
  },
  // 获取查询user列表
  findList: params => {
    return API.GET('/api/v1/users', params)
  },
  // 更改信息
  changeProfile: params => {
    return API.PATCH('/api/v1/users/profile', params)
  }
}
