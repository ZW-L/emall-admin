<template>
  <section class="main">
    <transition>
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

.main {
  background-color: $mainBgc;
}
</style>
