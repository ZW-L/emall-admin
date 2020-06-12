const asyncRoutes = [
  // 模块化导入
  {
    path: '/products',
    meta: { roles: ['admin', 'editor'] },
    children: [
      {
        path: '',
        name: 'ProductsIndex',
        component: () => import('@/views/products/index')
      },
      {
        path: 'detail',
        name: 'ProductsDetail',
        component: () => import('@/views/products/detail')
      },
      {
        path: 'add',
        name: 'ProductsAdd',
        component: () => import('@/views/products/add')
      }
    ]
  },
  {
    path: '/customer',
    meta: { roles: ['admin', 'editor'] },
    children: [
      {
        path: '',
        name: 'Customer',
        meta: { roles: ['admin'] },
        component: () => import('@/views/customer/index')
      },
      {
        path: 'add',
        name: 'CustomerAdd',
        component: () => import('@/views/customer/add')
      }
    ]
  },
  {
    path: '/order',
    meta: { roles: ['admin'] },
    children: [
      {
        path: '',
        name: 'OrderIndex',
        component: () => import('@/views/order/index')
      },
      {
        path: 'detail',
        name: 'OrderDetail',
        component: () => import('@/views/order/detail')
      },
      {
        path: 'return',
        name: 'OrderReturn',
        component: () => import('@/views/order/return')
      }
    ]
  },
  {
    path: '/analysis',
    meta: { roles: ['admin', 'editor'] },
    children: [
      {
        path: 'customers',
        name: 'AnalysisCustomers',
        component: () => import('@/views/analysis/customers')
      },
      {
        path: 'sales',
        name: 'AnalysisSales',
        component: () => import('@/views/analysis/sales')
      },
      {
        path: 'turnover',
        name: 'AnalysisTurnover',
        component: () => import('@/views/analysis/turnover')
      }
    ]
  },
  {
    path: '/role',
    meta: { roles: ['admin'] },
    children: [
      {
        path: '',
        name: 'RoleIndex',
        component: () => import('@/views/role/index')
      }
    ]
  }
]

function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

function filterAsyncRoutes (routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route } // 浅拷贝
    if (hasPermission(roles, tmp)) {
      // console.log(tmp)
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const routes = filterAsyncRoutes(asyncRoutes, ['editor'])
console.log(routes[1].children)
