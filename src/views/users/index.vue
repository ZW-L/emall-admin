<template>
  <div class="table-wrapper">
    <el-alert v-if="showTips" type="info" effect="dark">提示：点击详情按钮可浏览用户详细信息。</el-alert>
    <filter-card @search="handleSearch" />

    <el-table :data="currentUsers" stripe highlight-current-row>
      <el-table-column label="序号" prop="index" align="center" width="50px" />
      <el-table-column label="用户名" prop="name" align="center" width="100px" />
      <el-table-column label="邮箱" prop="email" align="center" width="200px" />
      <el-table-column label="注册时间" prop="register_date" align="center" width="200px"/>
      <el-table-column label="最后登录" prop="last_login_date" align="center" width="200px" />
      <el-table-column label="会员等级" prop="vip" align="center" width="100px" />
      <el-table-column label="操作" align="center" width="200px">
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
      :total="filterUsers.length">
    </el-pagination>

    <el-dialog title="编辑用户信息" :visible.sync="userFormVisible" width="500px">
      <el-form :model="userForm" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="userForm.name" autocomplete="off" clearable></el-input>
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
        <el-button @click="handleEditUserCancel">取 消</el-button>
        <el-button type="primary" @click="handleEditUserSuccess">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { resetIndex } from '@/utils/array.js'
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
      pageSize: 50, // 每页显示的条目数
      userFormVisible: false,
      userForm: {
        name: '',
        email: '',
        tel: '',
        vip: ''
      }
    }
  },
  computed: {
    ...mapState({
      showTips: state => state.settings.showTips
    }),
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
    console.log(this.showTips)
  },
  methods: {
    handleEdit (index, row) {
      this.userFormVisible = true
      this.userForm = Object.assign({}, row)
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
    },
    handleEditUserCancel () {
      this.$confirm('可能有尚未提交的修改，是否退出？', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '我再看看',
        type: 'warning'
      }).then(() => {
        this.userFormVisible = false
      })
    },
    handleEditUserSuccess () {
      this.$confirm('此操作为敏感操作，请再次确定提交信息！', '提示', {
        confirmButtonText: '直接提交',
        cancelButtonText: '我再看看',
        type: 'warning'
      }).then(() => {
        this.userFormVisible = false
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      })
    }
  }
}
</script>
