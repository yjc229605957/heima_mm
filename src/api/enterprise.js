//导包
import axios from 'axios'

// 导入token工具函数
import {
  getToken
} from '../utils/token';
// 统一设置 axios的设置
// axios.defaults 只能设置一个 axios对象
// 如果项目中 可能用到多个 axios 支持创建一个
// 后续的接口调用直接用  instance 即可

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  //跨域携带cookie
  withCredentials: true
})
//暴露出去 获取学科列表请求方法
export function enterpriseList(params) {
  return instance({
    url: '/enterprise/list',
    method: 'get',
    headers: {
      token: getToken()
    },
    params
  })
}
//暴露出去 新增学科请求方法
export function enterpriseAdd(data) {
  return instance({
    url: '/enterprise/add',
    method: 'post',
    headers: {
      token: getToken()
    },
    data
  })
}
//暴露出去 学科状态请求方法
export function enterpriseStatus(id) {
  return instance({
    url: '/enterprise/status',
    method: 'post',
    headers: {
      token: getToken()
    },
    data:{id}
  })
}
//暴露出去 编辑学科请求方法
export function enterpriseEdit(data) {
  return instance({
    url: '/enterprise/edit',
    method: 'post',
    headers: {
      token: getToken()
    },
    data
  })
}
//暴露出去 删除学科请求方法
export function enterpriseRemove(id) {
  return instance({
    url: '/enterprise/remove',
    method: 'post',
    headers: {
      token: getToken()
    },
    data:{id}
  })
}
