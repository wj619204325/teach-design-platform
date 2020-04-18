import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from 'views/layout.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    meta: {
      title: '首页'
    },
    redirect: '/login',
    component: Layout,
    children: [{
        path: '/MyTeachFile',
        name: 'MyTeachFile',
        meta: {
          title: '我的教案'
        },
        component: resolve => require(['views/MyTeachFile/index.vue'], resolve)
      },

      {
        path: '/design',
        component: resolve => require(['views/design/layout.vue'], resolve),
        redirect: '/design/CourseBrief',
        children: [{
            path: 'CourseBrief',
            name: 'CourseBrief',
            meta: {
              title: '课程简介'
            },
            component: resolve => require(['views/CourseBrief'], resolve)
          },
          {
            path: 'AcademicAnalysis',
            name: 'AcademicAnalysis',
            meta: {
              title: '学情分析'
            },
            component: resolve => require(['views/AcademicAnalysis'], resolve)
          },
          {
            path: 'TeachDemand',
            name: 'TeachDemand',
            meta: {
              title: '教学目标'
            },
            component: resolve => require(['views/TeachDemand'], resolve)
          },
          {
            path: 'TeachHard',
            name: 'TeachHard',
            meta: {
              title: '教学重难点'
            },
            component: resolve => require(['views/TeachHard'], resolve)
          },
          {
            path: 'TeachEnv',
            name: 'TeachEnv',
            meta: {
              title: '教学环境'
            },
            component: resolve => require(['views/TeachEnv'], resolve)
          },
          {
            path: 'TeachFlow',
            name: 'TeachFlow',
            meta: {
              title: '教学流程'
            },
            component: resolve => require(['views/TeachFlow'], resolve)
          },
          {
            path: 'TeachEvaluate',
            name: 'TeachEvaluate',
            meta: {
              title: '教学评价'
            },
            component: resolve => require(['views/TeachEvaluate'], resolve)
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: resolve => require(['views/Login/login'], resolve)
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: resolve => require(['views/Login/register'], resolve)

  },

]

const router = new VueRouter({
  routes
})

export default router