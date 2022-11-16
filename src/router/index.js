import { createRouter, createWebHashHistory } from 'vue-router'
import PageLayout from '../components/PageLayout.vue'
// import auth from '@/utils/auth'
// import store from '../store/index'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/data'
  },
  {
    path: '/data',
    name: 'data',
    component: PageLayout,
    redirect: '/data/call-summary',
    meta: { title: '数据查询' },
    children: [
      {
        path: 'call-summary',
        name: 'callSummary',
        component: () => import(/* webpackChunkName: "callSummary" */ '../views/CallSummary.vue'),
        meta: { title: '外呼记录汇总' }
      },
      {
        path: 'call-statistics',
        name: 'callStatistics',
        component: () => import(/* webpackChunkName: "callStatistics" */ '../views/CallStatistics.vue'),
        meta: { title: '人员外呼统计' }
      },
      {
        path: 'call-detail',
        name: 'callDetail',
        component: () => import(/* webpackChunkName: "callDetail" */ '../views/CallDetail.vue'),
        meta: { title: '外呼记录详情' }
      }
    ]
  },
  {
    path: '/account',
    name: 'account',
    component: PageLayout,
    redirect: '/account/account-statistics',
    meta: { title: '账号管理' },
    children: [
      {
        path: 'account-statistics',
        name: 'accountStatistics',
        component: () => import(/* webpackChunkName: "accountStatistics" */ '../views/account/AccountStatistics.vue'),
        meta: { title: '账号统计' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      x: 0,
      y: 0
    }
  }
})
// 导航守卫
// router.beforeEach((to, from, next) => {
//   window.document.title = to.meta.title
//   console.log(to, from)
// 判断是否鉴权
// if (auth.getCookie('user_token') || store.state.user_token) {
//   if (to.path === '/login') {
//     next('/')
//   } else {
//     next()
//   }
// } else {
//   if (to.path === '/login') {
//     next()
//   } else {
//     next('/login')
//   }
// }
// })
export default router
