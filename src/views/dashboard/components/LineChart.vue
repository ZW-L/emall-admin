<template>
  <div :style="{width,height}"></div>
</template>

<script>
import resize from './mixins/resize'
import echarts from 'echarts'
require('echarts/theme/macarons')

export default {
  mixins: [resize],

  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    }
  },

  data () {
    return {
      chart: null,
      option: {
        title: {
          text: '月销量'
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        legend: {
          data: ['预测', '实际']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        series: [{
          name: '预测',
          type: 'line',
          smooth: true,
          animationDuration: 1000,
          data: [5, 20, 36, 10, 10, 20]
        }, {
          name: '实际',
          type: 'line',
          smooth: true,
          animationDuration: 1500,
          data: [29, 30, 20, 6, 23, 13]
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
