//导入vue
import Vue from 'vue';
//导包
import VueRouter from 'vue-router';
//注册一下
Vue.use(VueRouter)

//组件导入
// 登录页
import login from '../views/login/login.vue';
// 首页
import index from '../views/index/index.vue';
//导入首页子路由
import children from './children';

// 导入token工具
import {
  getToken,
  removeToken
} from '../utils/token';
//导入饿了么的 Message组件
import {
  Message
} from 'element-ui';
//导入用户信息接口
import {
  userInfo
} from '../api/user.js';
// 导入vuex仓库
import store from '../store/store.js';



//
//路由规则
const routes = [{
    path: '/login',
    component: login,

  },
  {
    path: '/index',
    component: index,
    redirect: '/index/question',
    //访问白名单
    meta: {
      power: ['超级管理员', '管理员', '老师', '学生']
    },
    children
  },
  {
    path: '/',
    component: index
  },

]
//创建router实例
const router = new VueRouter({
  routes
});
//路由白名单
const whitePaths = ['/login']
//路由导航守卫
router.beforeEach((to, from, next) => {
  //判断时候转跳路由白名单
  if (whitePaths.includes(to.path.toLocaleLowerCase()) === false) {
    //判断是否已登录
    if (!getToken()) {
      Message.error("请先登录!!!!!");
      next("/login");
    } else {
      //如果有token就继续下一个验证
      //next()
      userInfo().then(res => {
        if (res.data.code === 200) {
          //判断用户状态是否被禁用 禁用就提示 启用就放过去
          if (res.data.data.status == 0) {
            Message.error("该账号已被禁用,请联系管理员!");
          } else {
            //账户启用的情况下判断该角色是否有权限访问该路由地址
            // 看在不在路由白名单内 ,在就放过去 不在就提示
            if (to.meta.power.includes(res.data.data.role)) {
              //如果token正确则跳转到首页并把数据存入vuex仓库
              next()
              store.state.userInfo = res.data.data;
              //头像需要加上基地址
              store.state.userInfo.avatar = process.env.VUE_APP_BASEURL + '/' + store.state.userInfo.avatar
            } else {
              Message.error('您没有权限访问此页面,请联系管理员!')
            }
          }
        } else if (res.data.code === 206) {
          //如果服务器返回token错误则提示并把伪装的token删除后转跳登录页
          Message.error("小样,还想伪装token啊!");
          removeToken();
          next("/login");
        }
      });
    }
  } else {
    //如果是白名单直接放行
    next()
  }
  // window.console.log(to)
  // window.console.log(from)



  // to 去的路由
  // from 来的路由
  // next 下一步 相当于放行
  // next()
  //继续向后执行,如果不调用 ,就会卡住不动
})
export default router //抛出router