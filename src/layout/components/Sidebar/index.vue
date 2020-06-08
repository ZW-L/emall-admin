<template>
  <div :class="{ 'collapse': isCollapse }">
    <logo title="Emall Admin"></logo>
    <el-menu
      mode="vertical"
      router
      background-color="#314156"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <el-menu-item index="1" route="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">用户</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" route="/users">所有用户</el-menu-item>
          <el-menu-item index="2-2" route="/users/add">添加用户</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">商品</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" route="/products">所有商品</el-menu-item>
          <el-menu-item index="3-2" route="/products/add">添加商品</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span slot="title">订单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" route="/orders">所有订单</el-menu-item>
          <el-menu-item index="4-2" route="/orders/return">退换货</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span slot="title">数据分析</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1" route="/analysis/users">用户分析</el-menu-item>
          <el-menu-item index="5-2" route="/analysis/sales">销量分析</el-menu-item>
          <el-menu-item index="5-3" route="/analysis/turnover">销售额</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="6">
        <i class="el-icon-s-custom"></i>
        <span slot="title">管理权限</span>
      </el-menu-item>

      <el-menu-item index="7">
        <i class="el-icon-more"></i>
        <span slot="title">更多</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import Logo from './logo'
import { mapState } from 'vuex'

export default {
  name: 'sidebar',
  components: {
    Logo
  },
  data () {
    return {
      activeId: 1,
      list: [
        { label: '仪表板', path: '/dashboard' },
        {
          label: '用户管理',
          children: [
            { label: '所有用户', path: '/users' },
            { label: '添加用户', path: '/users/add' }
          ]
        },
        {
          label: '商品管理',
          children: [
            { label: '所有商品', path: '/products' },
            { label: '添加商品', path: '/products/add' }
          ]
        },
        {
          label: '订单管理',
          children: [
            { label: '所有订单', path: '/orders' },
            { label: '退换货', path: '/orders/return' }
          ]
        },
        {
          label: '统计图表',
          children: [
            { label: '销量走向', path: '/analysis/sales' },
            { label: '营业额', path: '/analysis/turnover' },
            { label: '用户统计', path: '/analysis/users' }
          ]
        },
        {
          label: '管理员',
          path: '/admin'
        },
        {
          label: '关于',
          path: '/about'
        },
        { label: '重复条目1', path: '/' },
        { label: '重复条目2', path: '/' },
        { label: '重复条目3', path: '/' },
        { label: '重复条目4', path: '/' },
        { label: '重复条目5', path: '/' },
        { label: '重复条目6', path: '/' },
        { label: '重复条目7', path: '/' },
        { label: '重复条目8', path: '/' },
        { label: '重复条目9', path: '/' },
        { label: '重复条目10', path: '/' },
        { label: '重复条目11', path: '/' },
        { label: '重复条目12', path: '/' },
        { label: '重复条目13', path: '/' },
        { label: '重复条目14', path: '/' },
        { label: '重复条目15', path: '/' },
        { label: '重复条目16', path: '/' },
        { label: '重复条目17', path: '/' },
        { label: '重复条目18', path: '/' },
        { label: '重复条目19', path: '/' },
        { label: '重复条目20', path: '/' },
        { label: '重复条目21', path: '/' },
        { label: '重复条目22', path: '/' }
      ]
    }
  },
  computed: {
    ...mapState({
      opened: state => state.app.sidebar.opened
    }),
    isCollapse () {
      return !this.opened
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
      if (!data.path || data.path === this.$route.path) {
        return
      }
      this.$router.push(data.path)
    }
  }
}
</script>
