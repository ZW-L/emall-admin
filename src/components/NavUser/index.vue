<template>
  <el-dropdown class="dropdown" trigger="click">
    <span class="el-dropdown-link">
      <div class="dropdown-avatar-wrapper">
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="avatar">
      </div>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>个人中心</el-dropdown-item>
      <el-dropdown-item>项目地址</el-dropdown-item>
      <el-dropdown-item @click.native="handleLogout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'NavUser',
  methods: {
    handleLogout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  .el-dropdown-link:hover {
    cursor: pointer;
  }
  &-avatar-wrapper {
    box-sizing: border-box;
    display: inline-block;
    width: 40px;
    height: 50px;
    padding-top: 5px;
    img {
      width: 100%;
      border-radius: 5px;
    }
  }
}
</style>
