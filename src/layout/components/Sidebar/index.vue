<template>
  <div :class="{ 'collapse': isCollapse }">
    <logo title="Emall Admin" />
    <el-menu
      mode="vertical"
      background-color="#314156"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false">
      <sidebar-item
        v-for="routes in permission_routes"
        :key="routes.name"
        :basePath="routes.path"
        :routes="routes" />
    </el-menu>
  </div>
</template>

<script>
import Logo from './logo'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem.vue'

export default {
  name: 'sidebar',
  components: {
    Logo,
    SidebarItem
  },
  mounted () {
    console.log(this.permission_routes)
  },
  computed: {
    ...mapGetters(['sidebar', 'permission_routes']),
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
