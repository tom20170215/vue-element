// 图书相关api
import * as API from './'

export default {
  // 查询获取book列表
  findList: params => {
    return API.GET('/api/v1/books', params)
  },
  // 批量删除，传数组
  removeBatch: ids => {
    return API.DELETE(`/api/v1/books/batch/${ids}`)
  },
  add: params => {
    return API.POST(`/api/v1/books`, params)
  }

}
