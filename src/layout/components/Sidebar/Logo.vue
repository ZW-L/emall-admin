<template>
  <h1>
    <a class="logo">
      <span class="img-wrapper">
        <img :src="logo" alt="logo" class="logo-img">
      </span>
      <span class="logo-title">{{title}}</span>
    </a>
  </h1>
</template>

<script>
export default {
  name: 'SidebarLogo',
  data () {
    return {
      title: 'emall admin',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
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
    width: 30px;
  }
  &-title {
    font-size: 16px;
  }
}

</style>
