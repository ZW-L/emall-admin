<template>
  <div class="btn" @click="toggleClick">
    <i :class="icon"></i>
  </div>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    icon: {
      type: String,
      default: 'el-icon-s-fold'
    }
  },
  methods: {
    toggleClick () {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 22px;
  &:hover {
    cursor: pointer;
    background: #f9f9f9;
  }
}
</style>
