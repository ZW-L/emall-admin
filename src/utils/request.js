import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from './auth'

// 使用自定义配置，创建一个新的 axios 实例
// http://www.axios-js.com/zh-cn/docs/#%E5%88%9B%E5%BB%BA%E5%AE%9E%E4%BE%8B
const service = axios.create({
  timeout: 3000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 保证所有请求发出前都携带 token
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.status === 508 || res.status === 512 || res.status === 514) {
        MessageBox.confirm('您已退出登录，您可以选择停留在该页面或者重新登录。', '登出提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '关闭提示',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log(error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
