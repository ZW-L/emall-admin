import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 已登录，再访问 /login 时，重定向至 /
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 已有角色权限，直接跳转
        console.log('Has roles, next....')
        next()
      } else {
        try {
          // 未有角色权限，需要该获取角色并根据角色生成路由表
          const { roles } = await store.dispatch('user/getUserInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.addRoutes(accessRoutes)
          // 跳转
          next({ ...to, replace: true })
        } catch (err) {
          // 发生错误时，清除 token，重定向至登陆界面
          await store.dispatch('user/resetToken')
          Message.error(err || 'Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to) => {
  NProgress.done()
  console.log(to.path)
  store.dispatch('tagsView/addTag', { title: to.meta.title, path: to.path })
})
