<template>
  <div class="layout">
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar class="main-navbar"/>
      <app-main class="main-app"/>
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain, Navbar } from './components'
export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    Navbar
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  width: 100%;
  height: 100vh;
  .sidebar-container {
    width: 200px;
    color: #fff;
    background-color: rgb(22, 46, 35);
  }
  .main-container {
    flex: 1;
    .main-navbar {
      height: 50px;
      background-color: #ccc;
    }
    .main-app {
      height: calc(100vh - 50px);
      overflow: scroll;
    }
  }
}

</style>
