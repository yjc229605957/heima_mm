// 导入请求方法
import instance from './requset';

//暴露出去 获取学科列表请求方法
export function subjectList(params) {
  return instance({
    url: '/subject/list',
    method: 'get',
    params
  })
}
//暴露出去 新增学科请求方法
export function subjectAdd(data) {
  return instance({
    url: '/subject/add',
    method: 'post',
    data
  })
}
//暴露出去 编辑学科请求方法
export function subjectEdit(data) {
  return instance({
    url: '/subject/edit',
    method: 'post',
    data
  })
}
//暴露出去 删除学科请求方法
export function subjectRemove(id) {
  return instance({
    url: '/subject/remove',
    method: 'post',
    data:{id}
  })
}
//暴露出去 学科状态请求方法
export function subjectStatus(id) {
  return instance({
    url: '/subject/status',
    method: 'post',
    data:{id}
  })
}