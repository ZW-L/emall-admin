<template>
  <router-link to="/" class="logo">
    <div class="img-wrapper">
      <img :src="logo" alt="logo" class="img">
    </div>
    <div class="title-wrapper">
      <h1 v-show="opened" class="title">{{title}}</h1>
    </div>
  </router-link>
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
    opened () {
      return this.$store.getters.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.logo {
  display: flex;
  flex-direction: row;
  width: 200px;
  height: $logoBarHeight;
  background-color: $logoBarBg;

  .img-wrapper {
    margin: 10px 15px;
    width: $logoWidth;
    .img {
      width: 100%;
    }
  }

  .title-wrapper {
    .title {
      max-width: 140px;
      text-overflow: hidden;
      font-size: 14px;
      color: $titleColor;
      line-height: $logoBarHeight;
    }
  }
}

</style>
