<template>
  <div v-if="!routes.hidden">
    <template v-if="oneChildAtMost(routes)">
      <app-link :to="basePath">
        <el-menu-item :index="basePath">
          <svg-icon v-if="routes.children" :icon-class="routes.children[0].meta.icon" />
          <span :class="{ 'sidebar-title': routes.children }">
            {{ (routes.meta && routes.meta.title) || routes.children[0].meta.title }}
          </span>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else :index="basePath">
      <template slot="title">
        <svg-icon v-if="routes.meta.icon" :icon-class="routes.meta.icon" />
        <span :class="{ 'sidebar-title': routes.meta.icon }">{{ routes.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="(route, idx) in routes.children"
        :key="idx"
        :routes="route"
        :base-path="getFullPath(route.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
import AppLink from './Link.vue'

export default {
  name: 'sidebar-item',
  components: {
    SvgIcon,
    AppLink
  },
  props: {
    routes: Object,
    basePath: String // 标记父路径
  },
  methods: {
    oneChildAtMost (route) {
      return !route.children || (route.children && route.children.length <= 1)
    },
    getFullPath (path) {
      return this.basePath + '/' + path
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-title {
  margin-left: 10px;
}
</style>
