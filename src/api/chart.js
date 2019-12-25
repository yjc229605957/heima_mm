// 导入请求方法
import instance from './requset';

//暴露出去 获取学科列表请求方法
export function DataTitle() {
  return instance({
    url: '/data/title',
    method: 'post',
  })
}
//暴露出去 新增学科请求方法
export function DataStatistics() {
  return instance({
    url: '/data/statistics',
    method: 'post',
  })
}