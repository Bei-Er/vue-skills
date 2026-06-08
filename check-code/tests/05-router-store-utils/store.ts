import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: null as any,
    token: ''
  },

  mutations: {
    // 1: mutation 中执行异步操作
    async fetchUser(state) {
      const res = await fetch('/api/user')
      state.user = await res.json()
    }
  },

  actions: {
    // 2: action 中直接修改 state（应通过 mutation）
    login({ state }, payload) {
      state.token = payload.token
    }
  }
})

export default store
