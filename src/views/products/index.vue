<template>
  <div class="table-wrapper">
    <el-alert type="info" effect="dark">提示：点击编辑按钮可修改商品详细信息。</el-alert>
    <el-table :data="products" stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="商品名" prop="name"></el-table-column>
      <el-table-column label="商品 ID" prop="productId"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini" type="info">上架</el-button>
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
          name: '@string',
          productId: '@id'
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
  .el-table {
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
}
</style>
