import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  }
  return true
}

export function filterAsyncRoutes (routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route } // 浅拷贝
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(route)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise((resolve) => {
      let accessRoutes
      if (roles.includes('admin')) {
        // admin 拥有所有权限
        accessRoutes = asyncRoutes || []
      } else {
        // 更新其他角色的路由表
        accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
