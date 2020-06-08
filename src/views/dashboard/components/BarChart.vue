<template>
  <div :style="{width,height}"></div>
</template>

<script>
import resize from './mixins/resize'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  mixins: [resize],

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
        tooltip: {},
        legend: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }, {
          name: '库存',
          type: 'bar',
          data: [45, 30, 14, 40, 40, 30]
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
