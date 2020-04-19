<template>
  <div class="layout">
    <sidebar :class="['sidebar-container', { 'is-collapse': sidebarCollapse }]" />
    <div class="main-container">
      <navbar class="main-navbar" />
      <app-main class="main-app" />
    </div>
    <el-backtop target=".main-container">
    </el-backtop>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Sidebar, AppMain, Navbar } from './components'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    Navbar
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      sidebarCollapse: state => state.settings.sidebarCollapse
    })
  }
}
</script>
