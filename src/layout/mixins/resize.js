import { debounce } from '@/utils'

const { body } = document
const WIDTH = 992

export default {
  data () {
    return {
      $_handler: null
    }
  },
  watch: {
    $route () {
      if (this.device === 'mobile' && this.sidebar.opened) {
        this.$store.dispatch('closeSidebar', { withoutAnimation: false })
      }
    }
  },
  beforeMount () {
    // todo: 防抖 + 节流
    this.$_handler = debounce(this.$_resizeHandler, 100)
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted () {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      this.$store.dispatch('app/toggleDevice', 'mobile')
      this.$store.dispatch('app/closeSidebar', { withoutAnimation: true })
    }
  },
  methods: {
    $_isMobile () {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler () {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        this.$store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
        if (isMobile) {
          this.$store.dispatch('app/closeSidebar', { withoutAnimation: true })
        }
      }
    }
  }
}
