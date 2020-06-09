<template>
  <div class="table-wrapper">
    <!-- <el-alert v-if="showTips" type="info" effect="dark">提示：点击详情按钮可浏览用户详细信息。</el-alert> -->
    <filter-card @search="handleSearch" />
    <!-- 用户列表 -->
    <el-table :data="customers" stripe highlight-current-row
      v-loading.fullscreen="fullscreenLoading"
      element-loading-text="正在操作"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column label="序号" type="index" :index="updateIndex" align="center" width="70px" />
      <el-table-column label="客户名" prop="name" align="center" width="100px" />
      <el-table-column label="昵称" prop="nickname" align="center" width="100px" />
      <el-table-column label="ID" prop="id" align="center" />
      <el-table-column label="邮箱" prop="email" align="center" />
      <el-table-column label="会员等级" prop="vip" align="center" width="100px" />
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button size="mini" type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格分页 -->
    <table-pagination
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="all_result"
    />
    <!-- 编辑信息对话框 -->
    <el-dialog title="编辑用户信息" :visible.sync="customerFormVisible" width="450px">
      <el-form :model="customerForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="customerForm.name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户 ID">
          <el-input v-model="customerForm.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="customerForm.nickname" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="customerForm.email" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="customerForm.tel" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-radio v-model="customerForm.vip" label="大众会员">大众会员</el-radio>
          <el-radio v-model="customerForm.vip" label="高级会员">高级会员</el-radio>
          <el-radio v-model="customerForm.vip" label="超级会员">超级会员</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="customerFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmOperation">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCustomers, deleteCustomer, updateCustomer } from '@/api/customer'
import FilterCard from './FilterCard'
import TablePagination from '@/components/TablePagination'

export default {
  name: 'customer-view',

  components: {
    FilterCard,
    TablePagination
  },

  data () {
    return {
      customers: [], // 原始数据
      all_result: 0, // 符合筛选结果的数据总数
      currentPage: 1, // 当前显示的页码
      pageSize: 50, // 每页显示的条目数
      filter: { // 用户数据筛选规则
        vip: '',
        search: '',
        reverse: false
      },
      fullscreenLoading: false,
      customerFormVisible: false, // 控制修改用户信息的对话框
      customerForm: '' // 修改用户信息时需要提交的表单数据
    }
  },

  mounted () {
    this.handleGetCustomers()
  },

  methods: {
    // 获取数据：每次请求只获取一页数据
    handleGetCustomers () {
      this.fullscreenLoading = true
      getCustomers({
        page: this.currentPage,
        limit: this.pageSize,
        vip: this.filter.vip,
        search: this.filter.search,
        reverse: this.filter.reverse
      }).then(res => {
        const data = res.data
        this.fullscreenLoading = false
        this.customers = [].concat(data.items)
        this.all_result = data.all_result
      }).catch(err => {
        console.log(err)
        this.fullscreenLoading = false
      })
    },
    // 删除用户成功后，重新请求数据
    handleDelete (index, row) {
      this.$confirm('此操作为敏感操作，请再次确认！', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        deleteCustomer(row.id).then(res => {
          if (res.status === 200) {
            this.handleGetCustomers()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '删除失败！'
        })
      })
    },
    // 页码、每页显示数、筛选搜索变化时都重新请求数据
    handleSizeChange (val) {
      this.pageSize = val
      this.handleGetCustomers()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.handleGetCustomers()
    },
    handleSearch (list) {
      this.filter.vip = list.vip
      this.filter.search = list.search
      this.handleGetCustomers()
    },
    // 修改用户信息
    handleEdit (index, row) {
      this.customerFormVisible = true
      this.customerForm = Object.assign({}, row)
    },
    // 修改时显示提示框
    handleConfirmOperation () {
      this.$confirm('此操作为敏感操作，需要再次确定！', '警告', {
        confirmButtonText: '直接提交',
        cancelButtonText: '我再看看',
        type: 'warning'
      }).then(() => {
        updateCustomer(this.customerForm).then(res => {
          if (res.status === 200) {
            this.handleGetCustomers()
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
        })
        this.customerFormVisible = false
      }).catch(() => {
        this.customerFormVisible = false
      })
    },
    updateIndex (index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    }
  }
}
</script>
