<template>
  <el-form
    v-loading.fullscreen="fullscreenLoading"
    element-loading-text="正在操作"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :model="customerForm"
    label-width="80px"
    class="user-add-form"
  >
    <el-form-item label="用户名">
      <el-input v-model="customerForm.name"></el-input>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="customerForm.nickname"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="customerForm.email"></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="customerForm.tel"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio v-model="customerForm.sex" label="male">男</el-radio>
      <el-radio v-model="customerForm.sex" label="female">女</el-radio>
    </el-form-item>
    <el-form-item label="简介">
      <el-input type="textarea" v-model="customerForm.introduction"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">添加用户</el-button>
      <el-button @click="onClear">清空信息</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addCustomer } from '@/api/customer'

export default {
  name: 'customer-add',
  data () {
    return {
      customerForm: {
        name: '',
        nickname: '',
        email: '',
        tel: '',
        sex: '',
        introduction: ''
      },
      fullscreenLoading: false
    }
  },
  methods: {
    onSubmit () {
      this.fullscreenLoading = true
      addCustomer(this.customerForm).then(res => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '添加成功！'
          })
        } else {
          this.$message({
            type: 'error',
            message: '添加失败！'
          })
        }
        this.fullscreenLoading = false
      })
    },
    onClear () {
      this.customerForm = {
        name: '',
        nickname: '',
        email: '',
        tel: '',
        sex: '',
        desc: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-add-form {
  padding: 30px;
  width: 600px;
}
</style>
