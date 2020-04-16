<template>
  <div class="table-wrapper">
    <el-alert type="info" effect="dark">提示：点击详情按钮可修改订单详细信息。</el-alert>
    <el-card shadow="always">
      <el-table :data="products" stripe highlight-current-row>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="日期" prop="date"></el-table-column>
        <el-table-column label="订单编号" prop="productId"></el-table-column>
        <el-table-column label="状态" prop="statu"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini" type="primary"
              @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            <el-button
              size="mini" type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Mock from 'mockjs'

export default {
  data () {
    return {

    }
  },

  computed: {
    products () {
      return Mock.mock({
        'list|10-50': [{
          date: '@date',
          productId: '@id',
          'statu|1': ['待支付', '进行中', '已完成']
        }]
      }).list
    }
  },

  mounted () {
    console.log(this.users)
  },

  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  box-sizing: border-box;
  margin: 10px;
}
</style>
