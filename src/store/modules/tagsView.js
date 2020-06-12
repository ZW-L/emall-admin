const state = {
  defaultTags: [
    { title: '首页', path: '/', default: true },
    { title: '关于', path: '/about', default: true }
  ],
  currentTags: []
}

const mutations = {
  ADD_TAG: (state, tag) => {
    const index1 = state.defaultTags.findIndex(v => v.title === tag.title)
    const index2 = state.currentTags.findIndex(v => v.title === tag.title)
    if (index1 === -1 && index2 === -1) {
      state.currentTags.push(tag)
    }
  },
  CLOSE_TAG: (state, tag) => {
    const index = state.currentTags.findIndex(v => v.title === tag.title)
    if (index > -1) {
      state.currentTags.splice(index, 1)
    }
  },
  CLOSE_OTHER: (state, tag) => {
    const index = state.defaultTags.findIndex(v => v.title === tag.title)
    if (index === -1) {
      state.currentTags = [tag]
    } else {
      state.currentTags = []
    }
  },
  CLOSE_ALL: (state) => {
    state.currentTags = []
  }
}

const actions = {
  addTag ({ commit }, tag) {
    commit('ADD_TAG', tag)
  },
  closeTag ({ commit }, tag) {
    commit('CLOSE_TAG', tag)
  },
  closeOther ({ commit }, tag) {
    commit('CLOSE_OTHER', tag)
  },
  closeAll ({ commit }) {
    commit('CLOSE_ALL')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
