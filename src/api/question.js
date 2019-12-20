// 导入请求方法
import instance from './requset';

//暴露出去 获取学科列表请求方法
export function questionList(params) {
  return instance({
    url: '/question/list',
    method: 'get',
    params
  })
}
//暴露出去 新增学科请求方法
export function questionAdd(data) {
  return instance({
    url: '/question/add',
    method: 'post',
    data
  })
}
//暴露出去 学科状态请求方法
export function questionStatus(id) {
  return instance({
    url: '/question/status',
    method: 'post',
    data:{id}
  })
}
//暴露出去 编辑学科请求方法
export function questionEdit(data) {
  return instance({
    url: '/question/edit',
    method: 'post',
    data
  })
}
//暴露出去 删除学科请求方法
export function questionRemove(id) {
  return instance({
    url: '/question/remove',
    method: 'post',
    data:{id}
  })
}
//暴露出去 上传文件请求方法
export function questionUpload(file) {
  return instance({
    url: '/question/upload',
    method: 'post',
    data:{file}
  })
}
//暴露出去 题目信息请求方法
export function questionOne(id) {
  return instance({
    url: '/question/one',
    method: 'post',
    data:{id}
  })
}
