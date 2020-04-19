<template>
  <div class="table-wrapper">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-alert type="info" effect="dark">提示：点击详情按钮可修改商品详细信息。</el-alert>
    <el-table :data="products" stripe>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column label="商品名" prop="name"></el-table-column>
      <el-table-column label="上架时间" prop="date" sortable></el-table-column>
      <el-table-column label="商品 ID" prop="productId"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" type="primary"
            @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="mini" type="primary">下架</el-button>
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

export default {
  data () {
    return {
      products: [],
      formInline: {
        user: '',
        region: ''
      }
    }
  },

  computed: {

  },

  mounted () {
    axios.get('/api/products')
      .then(res => {
        this.products = res.data.list
      })
  },

  methods: {
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
