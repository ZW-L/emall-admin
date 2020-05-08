const state = {
  sidebarCollapse: false, // 是否折叠边栏
  showTips: true // 是否显示全局提示文本
}

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebarCollapse = !state.sidebarCollapse
  },
  TOGGLE_SHOW_TIPS: (state) => {
    state.showTips = !state.showTips
  }
}

const actions = {
  toggleSidebar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  toggleShowTips ({ commit }) {
    commit('TOGGLE_SHOW_TIPS')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
