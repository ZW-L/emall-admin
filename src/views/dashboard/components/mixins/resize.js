import { debounce } from '@/utils'

export default {
  data () {
    return {
      $_sidebarElm: null,
      $_resizeHandler: null
    }
  },
  mounted () {
    this.$_resizeHandler = debounce(() => {
      if (this.chart) {
        // 触发 echarts 的 resize()
        this.chart.resize()
      }
    }, 100)
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  beforeDestroy () {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  activated () {
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  deactivated () {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  methods: {
    // 窗口 resize 事件
    $_initResizeEvent () {
      window.addEventListener('resize', this.$_resizeHandler)
    },
    $_destroyResizeEvent () {
      window.removeEventListener('resize', this.$_resizeHandler)
    },
    // sidebar 收起/展开时，监听 transitionend 事件，再触发 echarts 的 resize()
    $_initSidebarResizeEvent () {
      this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    $_destroySidebarResizeEvent () {
      this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    $_sidebarResizeHandler (e) {
      if (e.propertyName === 'width') {
        this.$_resizeHandler()
      }
    }
  }
}
