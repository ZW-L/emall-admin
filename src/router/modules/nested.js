import Layout from '@/layout'

export default {
  path: '/nested',
  name: 'Nested',
  component: Layout,
  meta: { title: '嵌套', icon: 'nested' },
  children: [
    {
      path: '1',
      meta: { title: '1' },
      component: () => import('@/views/nested')
    },
    {
      path: '2',
      meta: { title: '2' },
      children: [
        {
          path: '1',
          meta: { title: '2-1' },
          component: () => import('@/views/nested')
        },
        {
          path: '2',
          meta: { title: '2-2' },
          children: [
            {
              path: '1',
              meta: { title: '2-2-1' },
              component: () => import('@/views/nested')
            },
            {
              path: '2',
              meta: { title: '2-2-2' },
              component: () => import('@/views/nested')
            }
          ]
        }
      ]
    }
  ]
}
