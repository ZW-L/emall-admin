<template>
  <div class="table-wrapper">
    <el-alert type="info" effect="dark">提示：点击详情按钮可修改订单详细信息。</el-alert>
    <el-card shadow="always">
      <el-table :data="orders" stripe highlight-current-row>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="日期" prop="date"></el-table-column>
        <el-table-column label="订单编号" prop="productId"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
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
import axios from 'axios'

export default {
  data () {
    return {
      orders: []
    }
  },

  computed: {

  },

  mounted () {
    axios.get('/api/orders')
      .then(res => {
        this.orders = res.data.list
      })
  },

  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.orders.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
