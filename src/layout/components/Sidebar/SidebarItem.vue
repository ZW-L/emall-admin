<template>
  <div>
    <router-link :to="path">
      <p :class="['item', active ? 'item-active' : '']">{{title}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    active: Boolean,
    path: String
  },

  methods: {
    handleItemClick () {

    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  &:hover {
    cursor: pointer;
    background-color: #1ba786;
  }
}

.item-active {
  background-color: #11bbaa;
}
</style>
