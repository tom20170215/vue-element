import axios from 'axios'
import Bus from '../bus.js'

// 跨站点访问控制请求
axios.defaults.withCredentials = true

// 添加一个相应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data && response.data.errcode) {
    if (parseInt(response.data.errcode) === 40001) {
      // 未登录
      Bus.$emit('goto', '/login')
    }
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

// 基地址
let base = '' // 接口代理地址参见：config/index.js中的proxyTable配置

// 通用方法
export const POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(`${base}${url}`, {params: params}).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}
