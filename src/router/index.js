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
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users',
    children: [
      {
        path: '',
        component: () => import('@/views/users/index'),
        name: 'UsersIndex'
      },
      {
        path: 'detail',
        component: () => import('@/views/users/detail'),
        name: 'UsersDetail'
      },
      {
        path: 'add',
        component: () => import('@/views/users/add'),
        name: 'UsersAdd'
      }
    ]
  },
  {
    path: '/products',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/products/index'),
        name: 'ProductsIndex'
      },
      {
        path: 'detail/',
        component: () => import('@/views/products/detail'),
        name: 'ProductsDetail'
      },
      {
        path: 'add',
        component: () => import('@/views/products/add'),
        name: 'ProductsAdd'
      }
    ]
  },
  {
    path: '/orders',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/orders/index'),
        name: 'OrdersIndex'
      },
      {
        path: 'detail',
        component: () => import('@/views/orders/detail'),
        name: 'OrdersDetail'
      },
      {
        path: 'return',
        component: () => import('@/views/orders/return'),
        name: 'OrdersReturn'
      }
    ]
  },
  {
    path: '/analysis',
    component: Layout,
    children: [
      {
        path: 'users',
        component: () => import('@/views/analysis/users'),
        name: 'AnalysisUsers'
      },
      {
        path: 'sales',
        component: () => import('@/views/analysis/sales'),
        name: 'AnalysisSales'
      },
      {
        path: 'turnover',
        component: () => import('@/views/analysis/turnover'),
        name: 'AnalysisTurnover'
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/admin/index')
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/about/index')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }), // 技巧：设置路由滚动行为，每次路由跳转都将滚动条置顶
  routes: constantRoutes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  next()
})

export default router
