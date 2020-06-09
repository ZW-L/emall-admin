<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          prefix-icon="el-icon-user"
          name="username"
          placeholder="账号"
          maxlength="20"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          prefix-icon="el-icon-lock"
          name="password"
          :show-password="true"
          placeholder="密码"
          maxlength="20"
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" size="medium" @click="handleLogin" style="width:100%;">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于 5 个字符！'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空！' },
          { trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空！' },
          { trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleLogin () {
      console.log('submit')
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(res => {
              this.$router.push('/')
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
        } else {
          this.$message({
            type: 'error',
            message: '登录失败'
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-container {
  .el-form-item {
    margin-bottom: 30px;

    .el-input__inner {
      text-indent: .5em;
      color: #eee;
      border: 1px solid #3e4957;
      background: #283443;
    }

    &.is-error {
      .el-input__inner {
        border: none;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #2d3a4b;

  .login-form {
    width: 500px;
    margin: 0 auto;
    padding: 150px 50px 50px;
    color: #eee;

    .title-container {
      height: 50px;
      line-height: 50px;
      font-size: 22px;
      text-align: center;
      margin-bottom: 30px;
    }

  }
}
</style>
