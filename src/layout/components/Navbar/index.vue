<template>
  <div class="navbar">
    <svg-icon :icon-class="iconClass" class="toggle-sidebar" @click="toggleSidebar"></svg-icon>

    <el-breadcrumb
      class="navbar-main"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <nav-user class="navbar-user" />
  </div>
</template>

<script>
import NavUser from './components/NavUser.vue'
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'Navbar',
  components: {
    NavUser,
    SvgIcon
  },
  computed: {
    iconClass () {
      return this.$store.getters.sidebar.opened ? 'collapse' : 'show'
    }
  },
  methods: {
    toggleSidebar () {
      this.$store.dispatch('app/toggleSidebar')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.navbar {
  display: flex;
  font-size: 14px;

  .toggle-sidebar {
    width: 40px;
    text-align: center;
    line-height: $navBarHeight;
    cursor: pointer;
  }

  &-main {
    flex: 1;
    font-size: 12px;
    line-height: $navBarHeight;
  }

  &-user {
    width: 80px;
  }
}
</style>
