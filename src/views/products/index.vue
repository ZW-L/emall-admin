<template>
  <div class="table-wrapper">
    <el-alert type="info" effect="dark">提示：点击编辑按钮可修改商品详细信息。</el-alert>
    <filter-card @search="handleSearch"></filter-card>

    <el-table :data="products" stripe highlight-current-row>
      <el-table-column label="序号" prop="index" width="60px" align="center" />
      <el-table-column label="商品名" prop="name" width="100px" />
      <el-table-column label="上架时间" prop="date" sortable width="200px" align="center" />
      <el-table-column label="商品 ID" prop="productId" width="110px" />
      <el-table-column label="品类" prop="category" width="100px" align="center" />
      <el-table-column label="标签" prop="tags" width="150px" align="center" />
      <el-table-column label="上架" prop="onsale" width="100px" align="center">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.onsale"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button
            size="mini" type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini" type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import FilterCard from './FIlterCard'

export default {
  data () {
    return {
      products: []
    }
  },
  components: {
    FilterCard
  },
  computed: {

  },
  mounted () {
    axios.get('/api/products')
      .then(res => {
        this.products = res.data.list
        console.log(this.products)
      })
  },
  methods: {
    handleSearch (list) {

    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.products.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '删除已取消。'
        })
      })
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  box-sizing: border-box;
  margin: 10px;
  .el-table {
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
}
</style>
