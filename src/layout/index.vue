<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device === 'mobile' && sidebar.opened" class="mask" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar class="main-navbar" />
      <tags-view />
      <app-main class="main-app" />
    </div>
    <el-backtop id="backtop" target=".main-container" />
  </div>
</template>

<script>
import resize from './mixins/resize'
import { mapState } from 'vuex'
import { Sidebar, AppMain, Navbar, TagsView } from './components'

export default {
  name: 'Layout',
  mixins: [resize],
  components: {
    Sidebar,
    AppMain,
    Navbar,
    TagsView
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device
    }),
    classObj () {
      return {
        'hide-sidebar': !this.sidebar.opened,
        'show-sidebar': this.sidebar.opened,
        'without-animation': this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside () {
      console.log('click...')
      this.$store.dispatch('app/closeSidebar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss">
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  /* 修改定位为固定定位，禁止滑动行为 */
  &.mobile.show-sidebar {
    position: fixed;
    top: 0;
  }
}

.mask {
  z-index: 999;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .3;
  background-color: #000;
}
</style>
