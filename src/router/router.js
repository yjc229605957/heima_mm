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

// 导入首页的子组件 
//学科页面
import subject from '../views/index/children/subject.vue';
//用户页面
import user from '../views/index/children/user.vue';
//数据页面
import chart from '../views/index/children/chart.vue';
//题库页面
import question from '../views/index/children/question.vue';
//企业页面
import enterprise from '../views/index/children/enterprise.vue';

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
    component: login
  },
  {
    path: '/index',
    component: index,
    redirect:'/index/subject',
    children: [{
        path: 'subject',
        component: subject
      },
      {
        path: 'chart',
        component: chart
      },
      {
        path: 'user',
        component: user
      },
      {
        path: 'enterprise',
        component: enterprise
      },
      {
        path: 'question',
        component: question
      },
    ]
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
        window.console.log(res);
        if (res.data.code === 200) {
          //如果token正确则跳转到首页并把数据存入vuex仓库
          next()
          store.state.userInfo = res.data.data;
          //头像需要加上基地址
          store.state.userInfo.avatar = process.env.VUE_APP_BASEURL + '/' + store.state.userInfo.avatar
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