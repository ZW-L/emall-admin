<template>
  <h1>
    <router-link to="/" class="logo">
      <span class="img-wrapper">
        <img :src="logo" alt="logo" class="logo-img">
      </span>
      <span v-show="!sidebarCollapse" class="logo-title">{{title}}</span>
    </router-link>
  </h1>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: 'Admin'
    },
    logo: {
      type: String,
      default: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },
  computed: {
    sidebarCollapse () {
      return this.$store.state.settings.sidebarCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  width: 100%;
  height: 50px;
  text-align: center;
  background-color: #074349;
  color: #fff;
  &-img {
    margin-right: 10px;
    width: 30px;
    vertical-align: middle;
  }
  &-title {
    max-width: 150px;
    text-overflow: hidden;
    font-size: 16px;
  }
}

</style>
