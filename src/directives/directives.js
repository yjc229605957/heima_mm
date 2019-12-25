import Vue from 'vue';
import store from '../store/store';
// 自定义指令 Vue.directive
// 筛选黑名单内角色不可见功能
Vue.directive('power', {
  inserted: function (el, binding) {
    if (binding.value.includes(store.state.userInfo.role)) {
      el.parentNode.removeChild(el)
    }

  }
})