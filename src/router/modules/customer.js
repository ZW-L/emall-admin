import Layout from '@/layout'

export default {
  path: '/customer',
  component: Layout,
  meta: { roles: ['admin', 'editor'], title: '客户管理', icon: 'customer' },
  children: [
    {
      path: '',
      name: 'Customer',
      meta: { roles: ['admin'], title: '所有客户' },
      component: () => import('@/views/customer/index')
    },
    {
      path: 'add',
      name: 'CustomerAdd',
      meta: { title: '添加客户' },
      component: () => import('@/views/customer/add')
    }
  ]
}
