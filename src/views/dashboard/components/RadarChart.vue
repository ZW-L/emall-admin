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
      default: '300px'
    }
  },

  data () {
    return {
      chart: null,
      option: {
        radar: {
          radius: '55%',
          center: ['50%', '45%'],
          splitNumber: 10,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: '衬衫', max: 50 },
            { name: '羊毛衫', max: 50 },
            { name: '雪纺衫', max: 50 },
            { name: '裤子', max: 50 },
            { name: '高跟鞋', max: 50 },
            { name: '袜子', max: 50 }
          ]
        },
        legend: {
          left: 'center',
          bottom: 10,
          textStyle: {
            fontSize: 10
          },
          data: ['视频广告', '邮件营销', '直接访问', '搜索引擎']
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [{
            value: [20, 10, 30, 14, 25, 33],
            name: '视频广告'
          }, {
            value: [33, 45, 41, 28, 8, 28],
            name: '搜索引擎'
          }, {
            value: [45, 11, 6, 25, 22, 11],
            name: '邮件营销'
          }, {
            value: [12, 34, 23, 33, 45, 28],
            name: '直接访问'
          }]
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
