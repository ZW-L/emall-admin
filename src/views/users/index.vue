<template>
  <div class="table-wrapper">
    <el-alert v-if="showTips" type="info" effect="dark">提示：点击详情按钮可浏览用户详细信息。</el-alert>
    <filter-card @search="handleSearch" />

    <el-table :data="users" stripe highlight-current-row
      v-loading.fullscreen="fullscreenLoading"
      element-loading-text="正在操作"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column label="序号" type="index" :index="updateIndex" align="center" width="70px" />
      <el-table-column label="用户名" prop="name" align="center" width="100px" />
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

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100]"
      :page-size="pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="all_result">
    </el-pagination>

    <el-dialog title="编辑用户信息" :visible.sync="userFormVisible" width="450px">
      <el-form :model="userForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="userForm.name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户 ID">
          <el-input v-model="userForm.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userForm.nickname" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userForm.tel" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-radio v-model="userForm.vip" label="大众会员">大众会员</el-radio>
          <el-radio v-model="userForm.vip" label="高级会员">高级会员</el-radio>
          <el-radio v-model="userForm.vip" label="超级会员">超级会员</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmOperation">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUsers, deleteUser, updateUser } from '@/api/user'
import FilterCard from './FilterCard'

export default {
  name: 'UsersView',
  components: {
    FilterCard
  },
  data () {
    return {
      users: [], // 原始数据
      all_result: 0, // 符合筛选结果的数据总数
      currentPage: 1, // 当前显示的页码
      pageSize: 50, // 每页显示的条目数
      filter: { // 用户数据筛选规则
        vip: '',
        search: '',
        reverse: false
      },
      fullscreenLoading: false,
      userFormVisible: false, // 控制修改用户信息的对话框
      userForm: { // 修改用户信息时需要提交的表单数据
        name: '',
        id: '',
        nickname: '',
        email: '',
        tel: '',
        vip: ''
      }
    }
  },
  computed: {
    ...mapGetters(['showTips'])
  },
  mounted () {
    this.handleGetUsers()
  },
  methods: {
    handleGetUsers () {
      this.fullscreenLoading = true
      getUsers({
        page: this.currentPage,
        limit: this.pageSize,
        vip: this.filter.vip,
        search: this.filter.search,
        reverse: this.filter.reverse
      }).then(res => {
        const data = res.data
        this.fullscreenLoading = false
        this.users = [].concat(data.items)
        this.all_result = data.all_result
      })
    },
    // 删除用户成功后，重新请求数据
    handleDelete (index, row) {
      this.$confirm('此操作为敏感操作，请再次确认！', '警告', {
        confirmButtonText: '确定操作',
        cancelButtonText: '我再想想',
        type: 'warning'
      }).then(() => {
        deleteUser(row.id).then(res => {
          if (res.status === 200) {
            this.handleGetUsers()
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
      this.handleGetUsers()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      window.scrollTo({ x: 0, y: 0 })
      this.handleGetUsers()
    },
    handleSearch (list) {
      this.filter.vip = list.vip
      this.filter.search = list.search
      this.handleGetUsers()
    },
    // 修改用户信息
    handleEdit (index, row) {
      this.userFormVisible = true
      this.userForm = Object.assign({}, row)
    },
    handleConfirmOperation () {
      this.$confirm('此操作为敏感操作，需要再次确定！', '警告', {
        confirmButtonText: '直接提交',
        cancelButtonText: '我再看看',
        type: 'warning'
      }).then(() => {
        updateUser(this.userForm).then(res => {
          if (res.status === 200) {
            this.handleGetUsers()
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
        })
        this.userFormVisible = false
      }).catch(() => {})
    },
    updateIndex (index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    handleIndexReverse (e) {
      console.log(e)
    }
  }
}
</script>
