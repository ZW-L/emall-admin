<template>
  <div class="table-wrapper">
    <el-alert type="info" effect="dark">提示：点击详情按钮可浏览用户详细信息。</el-alert>
    <filter-card @search="handleSearch" />

    <el-table :data="currentUsers" stripe highlight-current-row>
      <el-table-column label="编号" prop="index" width="50px" align="center"></el-table-column>
      <el-table-column label="用户名" prop="name" min-width="40px"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="注册时间" prop="register_date" min-width="50px"></el-table-column>
      <el-table-column label="会员等级" prop="vip" min-width="50px"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100]"
      :page-size="pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="filterUsers.length">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import { resetIndex } from '@/util/array.js'
import FilterCard from './FilterCard'

export default {
  name: 'UsersView',
  components: {
    FilterCard
  },
  data () {
    return {
      users: [], // 原始数据
      filterUsers: [], // 通过筛选后的数据
      currentPage: 1, // 当前显示的页码
      pageSize: 50 // 每页显示的条目数
    }
  },
  computed: {
    currentUsers () { // 当前页码展示的条目
      return resetIndex(this.filterUsers.slice(this.baseIndex, this.baseIndex + this.pageSize), this.baseIndex)
    },
    baseIndex () { // 当前页码的第一个编号
      return (this.currentPage - 1) * this.pageSize
    }
  },
  mounted () {
    axios.get('/api/users')
      .then(res => {
        this.users = resetIndex(res.data.list, 0)
        this.filterUsers = this.users
      })
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleSearch (list) {
      // todo: 设计一个 promise 搜索链，可以依次根据条件进行搜索
      console.log(list.vip)
      this.currentPage = 1 // 重置分页
      if (!list.vip) {
        this.filterUsers = this.users
      } else {
        const vipString = list.vip === 'normal' ? '大众会员' : (list.vip === 'high' ? '高级会员' : '超级会员')
        this.filterUsers = resetIndex(this.users.filter(v => v.vip === vipString), this.baseIndex)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
