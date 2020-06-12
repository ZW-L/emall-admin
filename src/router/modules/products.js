import Layout from '@/layout'

export default {
  path: '/products',
  component: Layout,
  meta: { roles: ['admin', 'editor'], title: '商品管理', icon: 'products' },
  children: [
    {
      path: '',
      name: 'ProductsIndex',
      meta: { title: '所有商品' },
      component: () => import('@/views/products/index')
    },
    {
      path: 'detail',
      name: 'ProductsDetail',
      meta: { title: '商品详情' },
      component: () => import('@/views/products/detail')
    },
    {
      path: 'add',
      name: 'ProductsAdd',
      meta: { title: '添加商品' },
      component: () => import('@/views/products/add')
    }
  ]
}
