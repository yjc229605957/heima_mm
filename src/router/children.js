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


export default [{
    path: 'subject',
    component: subject,
    meta: {
      icon: 'el-icon-notebook-2',
      name: '学科列表',
      power: ['超级管理员', '管理员', '老师']
    }
  },
  {
    path: 'chart',
    component: chart,
    meta: {
      icon: 'el-icon-pie-chart',
      name: '数据概览',
      power: ['超级管理员', '管理员']
    },
  },
  {
    path: 'user',
    component: user,
    meta: {
      icon: 'el-icon-user',
      name: '用户列表',
      power: ['超级管理员', '管理员']
    },
  },
  {
    path: 'enterprise',
    component: enterprise,
    meta: {
      icon: 'el-icon-office-building',
      name: '企业列表',
      power: ['超级管理员', '管理员', '老师']
    },
  },
  {
    path: 'question',
    component: question,
    meta: {
      icon: 'el-icon-edit-outline',
      name: '题库列表',
      power: ['超级管理员', '管理员', '老师', '学生']
    },
  },
]