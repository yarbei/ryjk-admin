import Vue from 'vue'

const state = {
  status: 0
}

const actions = {
  async setStatus({commit}, s) {
    console.log(s)
    commit('SET_STATUS', s)
  }
}

const mutations = {
  SET_STATUS (state, s) {
    state.status = s
  }
}

export default {
  state,
  actions,
  mutations
}
