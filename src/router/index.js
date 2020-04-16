import Vue from 'vue'
import VueRouter from 'vue-router'

/* Layout */
import Layout from '@/layout'
import Login from '@/views/login'

Vue.use(VueRouter)

const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '@/redirect/:path', // 技巧：动态路由匹配
        component: () => import('@/views/redirect/index') // 技巧：将 redirect 组件用作路由配置的通用配置方式
      }
    ]
  },
  {
    path: '/',
    component: Layout
  },
  {
    path: '/users',
    component: Layout
  },
  {
    path: '/dashboard',
    component: Layout
  },
  {
    path: '/products',
    component: Layout
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/orders',
    component: Layout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }), // 技巧：设置路由滚动行为，每次路由跳转都将滚动条置顶
  routes: constantRoutes
})

export default router
