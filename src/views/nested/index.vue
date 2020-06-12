<template>
  <h1>{{ $route.path }}</h1>
</template>

<script>
export default {
  data () {
    return {
      path: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.path = to.path
    }
  }
}
</script>
