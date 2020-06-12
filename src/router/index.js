import Vue from 'vue'
import Router from 'vue-router'

import customerRoutes from './modules/customer'
import productsRoutes from './modules/products'
import nestedRoutes from './modules/nested'

/* Layout */
import Layout from '@/layout'

Vue.use(Router)

// 通用路由，不需要权限
export const constantRoutes = [
  {
    path: '/redirect',
    name: 'Redirect',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '@/redirect/:path', // 技巧：动态路由匹配
        component: () => import('@/views/redirect/index') // 技巧：将 redirect 组件用作路由配置的通用配置方式
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '',
        name: 'About',
        component: () => import('@/views/about/index'),
        meta: { title: '关于', icon: 'about' }
      }
    ]
  }
]

// 需要权限，根据角色权限动态生成不同的路由表
export const asyncRoutes = [
  // 模块化导入
  customerRoutes,
  productsRoutes,
  nestedRoutes,

  {
    path: '/order',
    component: Layout,
    meta: { roles: ['admin'], title: '订单管理', icon: 'order' },
    children: [
      {
        path: '',
        name: 'OrderIndex',
        component: () => import('@/views/order/index'),
        meta: { title: '所有订单' }
      },
      {
        path: 'detail',
        name: 'OrderDetail',
        component: () => import('@/views/order/detail'),
        meta: { title: '订单详情' }
      },
      {
        path: 'return',
        name: 'OrderReturn',
        component: () => import('@/views/order/return'),
        meta: { title: '退换货' }
      }
    ]
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: Layout,
    meta: { roles: ['admin', 'editor'], title: '数据分析', icon: 'analysis' },
    children: [
      {
        path: 'customers',
        name: 'AnalysisCustomers',
        component: () => import('@/views/analysis/customers'),
        meta: { title: '用户分析' }
      },
      {
        path: 'sales',
        name: 'AnalysisSales',
        component: () => import('@/views/analysis/sales'),
        meta: { title: '销量分析' }
      },
      {
        path: 'turnover',
        name: 'AnalysisTurnover',
        component: () => import('@/views/analysis/turnover'),
        meta: { title: '营收分析' }
      }
    ]
  },
  {
    path: '/role',
    component: Layout,
    children: [
      {
        path: '',
        name: 'RoleIndex',
        component: () => import('@/views/role/index'),
        meta: { roles: ['admin'], title: '管理权限', icon: 'admin' }
      }
    ]
  }
]

const createRouter = () => new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }), // 技巧：设置路由滚动行为，每次路由跳转都将滚动条置顶
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
