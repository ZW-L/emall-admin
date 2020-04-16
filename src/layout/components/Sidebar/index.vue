<template>
  <div>
    <logo></logo>
    <div>
      <sidebar-item
        v-for="(item, index) in sidebar"
        :key="index"
        :title="item.title"
        :path="item.path"
        :active="item.id===activeId"
       />
    </div>
  </div>
</template>

<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem'

export default {
  data () {
    return {
      activeId: 1,
      sidebar: [
        {
          title: '仪表板',
          path: 'dashboard',
          id: 1
        },
        {
          title: '用户管理',
          path: '/users',
          id: 2
        },
        {
          title: '商品管理',
          path: '/products',
          id: 3
        },
        {
          title: '订单管理',
          path: '/orders',
          id: 4
        },
        {
          title: '统计分析',
          path: '/',
          id: 5
        }
      ]
    }
  },

  components: {
    Logo,
    SidebarItem
  },

  mounted () {
    console.log()
  }
}
</script>

<style lang="scss" scoped>

</style>
