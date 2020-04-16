<template>
  <div>
    <dashboard :is="componentActive" />
  </div>
</template>

<script>
import Dashboard from '@/views/dashboard/'
import Users from '@/views/users/'
import Products from '@/views/products/'
import Orders from '@/views/orders/'
import { camelString } from '@/util/format.js'

export default {
  components: {
    Dashboard,
    Users,
    Products,
    Orders
  },

  data () {
    return {

    }
  },

  computed: {
    componentActive () {
      return camelString(this.$route.path.slice(1))
    }
  },

  mounted () {
    console.log(this.componentActive)
  }
}
</script>

<style lang="scss" scoped>

</style>
