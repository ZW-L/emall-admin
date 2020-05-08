<template>
  <el-form ref="form" :model="form" label-width="80px" class="user-add-form">
    <el-form-item label="用户名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="form.tel"></el-input>
    </el-form-item>
    <el-form-item label="生日">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio v-model="form.sex" label="male">男</el-radio>
      <el-radio v-model="form.sex" label="female">女</el-radio>
    </el-form-item>
    <el-form-item label="简介">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">添加用户</el-button>
      <el-button @click="onClear">清空信息</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'user-add',
  data () {
    return {
      form: {
        name: '',
        email: '',
        tel: '',
        birthday: '',
        sex: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit')
      // todo: 提交修改请求到服务器期间，展示一个 loading 动画，在收到服务器响应时关闭动画
    },
    onClear () {
      this.form = {
        name: '',
        email: '',
        tel: '',
        birthday: '',
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
