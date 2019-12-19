// 导入请求方法
import instance from './requset';
// 导入token工具函数
import {
  getToken
} from '../utils/token';

//暴露出去 获取用户信息请求方法
export function userInfo() {
  return instance({
    url: '/info',
    method: 'get',
    headers:{
      token:getToken()
    }
  })
}
//暴露出去 用户退出登录请求方法
export function userLogout() {
  return instance({
    url: '/logout',
    method: 'get',
  })
}
//暴露出去 用户列表请求方法
export function userList(params) {
  return instance({
    url: '/user/list',
    method: 'get',
    params
  })
}
//暴露出去 新增用户请求方法
export function userAdd(data) {
  return instance({
    url: '/user/add',
    method: 'post',
    data
  })
}
//暴露出去 编辑用户请求方法
export function userEdit(data) {
  return instance({
    url: '/user/edit',
    method: 'post',
    data
  })
}
//暴露出去 用户状态请求方法
export function userStatus(id) {
  return instance({
    url: '/user/status',
    method: 'post',
    data:{id}
  })
}
//暴露出去 删除用户请求方法
export function userRemove(id) {
  return instance({
    url: '/user/remove',
    method: 'post',
    data:{id}
  })
}