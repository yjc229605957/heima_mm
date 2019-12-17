//导入vue
import Vue from 'vue';
//导入vuex(导入前需要装包)
import Vuex from 'vuex';
//注册vuex
Vue.use(Vuex)
//实例化vuex仓库
//使用时导包后用 store.state.属性名
//或者 this.$store.state.属性名
const store = new Vuex.Store({
  state:{
    userInfo:{
    }
  }
})
//暴露出去
export default store 