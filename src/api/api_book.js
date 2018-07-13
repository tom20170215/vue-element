// 图书相关api
import * as API from './'

export default {
  // 查询获取book列表
  findList: params => {
    return API.GET('/api/v1/books', params)
  }
}
