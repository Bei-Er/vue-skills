/**
 * 用户模块
 */
export default {
  namespaced: true,

  state: () => ({
    /** 用户名 */
    name: '',
    /** 用户邮箱 */
    email: '',
    /** 是否已登录 */
    isLoggedIn: false
  }),

  getters: {
    /** 用户显示名称 */
    displayName: (state) => state.name || '游客',
    /** 用户信息摘要 */
    profile: (state) => `${state.name} <${state.email}>`
  },

  mutations: {
    /** 设置用户名 */
    SET_NAME(state, name) {
      state.name = name
    },
    /** 设置登录状态 */
    SET_LOGGED_IN(state, status) {
      state.isLoggedIn = status
    }
  },

  actions: {
    /**
     * 用户登录
     * @param {Object} credentials 登录凭据
     */
    async login({ commit }, credentials) {
      commit('SET_LOGGED_IN', true)
    },
    /** 退出登录 */
    logout({ commit }) {
      commit('SET_NAME', '')
      commit('SET_LOGGED_IN', false)
    }
  }
}
