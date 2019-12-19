// 导入请求方法
import instance from './requset';

//暴露出去 获取学科列表请求方法
export function enterpriseList(params) {
  return instance({
    url: '/enterprise/list',
    method: 'get',
    params
  })
}
//暴露出去 新增学科请求方法
export function enterpriseAdd(data) {
  return instance({
    url: '/enterprise/add',
    method: 'post',
    data
  })
}
//暴露出去 学科状态请求方法
export function enterpriseStatus(id) {
  return instance({
    url: '/enterprise/status',
    method: 'post',
    data:{id}
  })
}
//暴露出去 编辑学科请求方法
export function enterpriseEdit(data) {
  return instance({
    url: '/enterprise/edit',
    method: 'post',
    data
  })
}
//暴露出去 删除学科请求方法
export function enterpriseRemove(id) {
  return instance({
    url: '/enterprise/remove',
    method: 'post',
    data:{id}
  })
}
