<template>
  <section>
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

</style>
