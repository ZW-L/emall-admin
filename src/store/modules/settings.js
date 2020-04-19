const state = {
  sidebarCollapse: false
}

const mutations = {
  // 切换 sidebar
  TOGGLE_SIDEBAR: (state) => {
    state.sidebarCollapse = !state.sidebarCollapse
  }
}

const actions = {
  toggleSidebar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
