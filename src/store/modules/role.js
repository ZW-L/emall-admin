import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/role'

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
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password }).then(res => {
        const { data } = res
        commit('SET_TOKEN', data.token) // 更新 store
        setToken(data.token) // 更新 cookie
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  logout ({ dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        dispatch('resetToken')
      }).catch(err => {
        reject(err)
      })
    })
  },

  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(res => {
        const { data } = res

        if (!data) {
          throw new Error('Verification failed, please login again.')
        }

        const { name, avatar, introduction, roles } = data

        if (!roles || roles.length <= 0) {
          throw new Error('getInfo: roles must be a non-null array!')
        }

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

  resetToken ({ commit }) {
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
      commit('SET_TOKEN', token)
      setToken()
      // const { roles } = await dispatch(getInfo)
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
