<template>
  <div>
    <icon-button class="pull-left" @toggleClick="handleToggleSidebar" />
    <el-breadcrumb
      class="nav-main pull-left"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <nav-user class="nav-user" />
  </div>
</template>

<script>
import IconButton from '@/components/IconButton'
import NavUser from '@/components/NavUser'

export default {
  name: 'Navbar',
  components: {
    IconButton,
    NavUser
  },
  methods: {
    handleToggleSidebar () {
      this.$store.dispatch('settings/toggleSidebar')
    }
  }
}
</script>

<style lang="scss" scoped>
.pull-left {
  float: left;
}
.nav-main {
  height: 50px;
  line-height: 50px;
}
.nav-user {
  float: right;
  margin-right: 30px;
}
</style>
