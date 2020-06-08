<template>
  <div class="dashboard">
    <!-- panel -->
    <panel-group />

    <!-- line chart -->
    <el-row class="line-chart">
      <el-col :span=24>
        <line-chart />
      </el-col>
    </el-row>

    <!-- other chart -->
    <el-row class="other-chart" :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <bar-chart class="other-chart-item" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <pie-chart class="other-chart-item" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <radar-chart class="other-chart-item" />
      </el-col>
    </el-row>

    <!-- info-group -->
    <el-row class="info-group" :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-table
          class="info-group-item info-group-item-order"
          :data="orders"
          style="width: 100%"
          size="mini">
          <el-table-column prop="id" label="订单号" />
          <el-table-column prop="price" label="金额" width="150px" align="center">
            <template v-slot=scope>
              {{scope.row.price | formatPrice}}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="150px" align="center">
            <template v-slot=scope>
              <el-button
                :type="scope.row.status === 'success' ? 'success' : 'danger'"
                size="mini"
              >{{scope.row.status}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="info-group-item"></div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="info-group-item"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup.vue'
import LineChart from './components/LineChart.vue'
import BarChart from './components/BarChart.vue'
import PieChart from './components/PieChart.vue'
import RadarChart from './components/RadarChart.vue'

export default {
  components: {
    PanelGroup,
    LineChart,
    BarChart,
    PieChart,
    RadarChart
  },

  data () {
    return {
      orders: [{
        id: '985100213',
        price: 4123,
        status: 'pending'
      }, {
        id: '985100213',
        price: 345,
        status: 'success'
      }, {
        id: '985100213',
        price: 145,
        status: 'pending'
      }, {
        id: '985100213',
        price: 2245,
        status: 'success'
      }, {
        id: '985100213',
        price: 1612,
        status: 'pending'
      }]
    }
  },

  filters: {
    formatPrice (price) {
      return `¥ ${price}`
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 30px 20px;
  .line-chart {
    height: 350px;
    margin-bottom: 30px;
    background-color: #fff;
  }

  .other-chart {
    &-item {
      height: 300px;
      margin-bottom: 30px;
      background-color: #fff;
    }
  }

  .info-group {
    &-item {
      min-height: 300px;
      margin-bottom: 30px;
      background-color: #fff;
    }
  }
}
</style>
