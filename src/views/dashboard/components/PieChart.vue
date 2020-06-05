<template>
  <div :style="{width,height}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')

export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },

  data () {
    return {
      chart: null,
      option: {
        title: {
          text: '访客来源'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['视频广告', '邮件营销', '直接访问', '搜索引擎']
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          roseType: 'angle',
          radius: '55%',
          data: [
            { value: 835, name: '视频广告' },
            { value: 710, name: '邮件营销' },
            { value: 335, name: '直接访问' },
            { value: 400, name: '搜索引擎' }
          ]
        }]
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },

  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption(this.option)
    }
  }
}
</script>
