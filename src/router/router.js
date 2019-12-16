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
  //
//路由规则
const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/index',
    component: index,
    children:[
      {
        path:'subject',
        component:subject
      },
      {
        path:'chart',
        component:chart
      },
      {
        path:'user',
        component:user
      },
      {
        path:'enterprise',
        component:enterprise
      },
      {
        path:'question',
        component:question
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
export default router //抛出router