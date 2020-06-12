<template>
  <div class="tags">
    <router-link class="btn" :to="tag.path"
      :class="{ 'is-active': activeTitle === tag.title }"
      v-for="tag of tags" :key="tag.title"
      @contextmenu.prevent.native="handleShowMenu(tag, $event)"
    >
      <span>{{ tag.title }}</span>
      <i v-show="!tag.default" class="el-icon-close" @click.prevent.stop="handleClose(tag)"></i>
    </router-link>
    <ul v-show="visiable" class="context-menu" :style="{ top: top + 'px', left: left + 'px' }">
      <li class="context-menu-item">刷新</li>
      <li class="context-menu-item" v-show="!selectedTag.default" @click="handleClose(selectedTag)">关闭</li>
      <li class="context-menu-item" @click="handleCloseOther(selectedTag)">关闭其他</li>
      <li class="context-menu-item" @click="handleCloseAll()">关闭所有</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      top: 0,
      left: 0,
      visiable: false,
      selectedTag: ''
    }
  },
  computed: {
    tags () {
      return this.$store.getters.tags
    },
    lastTag () {
      return this.tags[this.tags.length - 1]
    },
    activeTitle () {
      return this.$route.meta.title
    }
  },
  watch: {
    visiable (val) {
      if (val) {
        document.addEventListener('click', this.handleCloseMenu)
      } else {
        document.removeEventListener('click', this.handleCloseMenu)
      }
    }
  },
  methods: {
    handleClose (tag) {
      this.$store.dispatch('tagsView/closeTag', tag)
      // 关闭的标签正好是当前页面时，跳转到最后一个标签所在的页面
      if (tag.title === this.activeTitle) {
        this.$router.push(this.lastTag.path)
      }
    },
    handleCloseOther (tag) {
      this.$store.dispatch('tagsView/closeOther', tag)
      // 关闭其他后，自身获取焦点
      this.$router.push(tag.path)
    },
    handleCloseAll () {
      this.$store.dispatch('tagsView/closeAll')
      const title = this.$route.meta.title
      // 获取当前激活的 tag
      const activedTag = this.tags.find(v => v.title === title)
      console.log(activedTag)
      // 当前激活的 tag 不可关闭时，不跳转
      if (activedTag && activedTag.default) {
        return
      }
      this.$router.push(this.lastTag.path)
    },
    handleShowMenu (tag, e) {
      const menuWidth = 64
      const offsetLeft = this.$el.getBoundingClientRect().left
      const offsetWdith = this.$el.clientWidth
      const maxLeft = offsetWdith - menuWidth
      const left = e.clientX - offsetLeft + 20

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visiable = true
      this.selectedTag = tag
    },
    handleCloseMenu () {
      this.visiable = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  height: 30px;
  line-height: 28px;
  margin-left: 10px;

  .btn {
    box-sizing: border-box;
    display: inline-block;
    cursor: pointer;
    height: 22px;
    margin: 0 3px;
    padding: 3px 5px;
    font-size: 12px;
    line-height: 15px;
    color: #515151;
    border: 1px solid #ccc;
    background-color: #fff;
    transition: all .2s;

    .el-icon-close {
      margin-left: 3px;
      font-size: 12px;
    }

    &.is-active {
      color: #fff;
      border-color: #42b983;
      background-color: #42b983;
      &::before {
        content: "";
        display: inline-block;
        margin-right: 5px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #fff;
      }
    }
  }

  .context-menu {
    z-index: 100;
    position: absolute;
    list-style: none;
    color: #5e5e5e;
    font-size: 12px;
    background-color: #fff;
    box-shadow: 3px 2px 5px #ccc;
    &-item {
      cursor: pointer;
      padding: 0 8px;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
