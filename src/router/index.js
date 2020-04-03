import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: resolve => require(['views/CourseBrief'], resolve)
  },
  {
    path: '/CourseBrief',
    name: 'CourseBrief',
    meta: {
      title: '课程简介'
    },
    component: resolve => require(['views/CourseBrief'], resolve)
  },
  {
    path: '/AcademicAnalysis',
    name: 'AcademicAnalysis',
    meta: {
      title: '学情分析'
    },
    component: resolve => require(['views/AcademicAnalysis'], resolve)
  },
  {
    path: '/TeachDemand',
    name: 'TeachDemand',
    meta: {
      title: '教学目标'
    },
    component: resolve => require(['views/TeachDemand'], resolve)
  },
  {
    path: '/TeachHard',
    name: 'TeachHard',
    meta: {
      title: '教学重难点'
    },
    component: resolve => require(['views/TeachHard'], resolve)
  },
  {
    path: '/TeachEnv',
    name: 'TeachEnv',
    meta: {
      title: '教学环境'
    },
    component: resolve => require(['views/TeachEnv'], resolve)
  },
  {
    path: '/TeachFlow',
    name: 'TeachFlow',
    meta: {
      title: '教学流程'
    },
    component: resolve => require(['views/TeachFlow'], resolve)
  },
  {
    path: '/TeachEvaluate',
    name: 'TeachEvaluate',
    meta: {
      title: '教学评价'
    },
    component: resolve => require(['views/TeachEvaluate'], resolve)
  }

]

const router = new VueRouter({
  routes
})

export default router