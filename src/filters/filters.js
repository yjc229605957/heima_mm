//导入vue
import Vue from 'vue'
//导入moment插件
import moment from 'moment'
// 过滤器方法
Vue.filter('formatTime',v=>{
  return moment(v).format("YYYY年MM月DD日")
})
// 在main.js中导入 挂载到vue实例中即可使用
