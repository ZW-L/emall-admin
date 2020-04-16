<template>
  <div class="table-wrapper">
    <el-alert type="info" effect="dark">提示：点击详情按钮可浏览用户详细信息。</el-alert>
    <el-table :data="users" stripe style="text-align: center">
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="操作" prop="email">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
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
    users () {
      return Mock.mock({
        'list|10-50': [{
          name: '@cname',
          email: '@email'
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
    border-radius: 5px;
    border: 1px solid #ccc;
  }
}
</style>
