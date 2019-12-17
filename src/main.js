import Vue from 'vue'
import App from './App.vue'
//导入路由
import router from './router/router';
//导入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入vuex仓库
import store from './store/store';
// 注册一下
Vue.use(ElementUI);

Vue.config.productionTip = false
//导入全局样式
import './style/base.css';




new Vue({
  render: h => h(App),
  //将router挂载到vue实例中
  router,
  //将store挂载到vue实例中
  store
}).$mount('#app')
