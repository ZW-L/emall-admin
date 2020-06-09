import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      const { username, password } = userInfo
      login({ username: username.trim(), password }).then(res => {
        const { data } = res
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(err => {
        console.log(err.message)
        reject(err)
      })
    })
  },

  getUserInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token).then(res => {
        const { data } = res
        if (!data) {
          reject(new Error('验证失败，请重新登录！'))
        }

        const { name, avatar, introduction, roles } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_ROLES', roles)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  logout ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        console.log('logout...')
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        // resetRouter()
        router.push('/login')

        // dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 删除 token
  removeToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  changeRoles ({ commit, dispatch }, role) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('set_token', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')
      // resetRouter()

      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
      router.addRoutes(accessRoutes)

      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
