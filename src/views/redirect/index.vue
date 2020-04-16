<script>
export default {
  created () {
    // 管理页面的重定向
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
    console.log('redirect...')
  },

  render: function (h) {
    return h()
  }
}
</script>
