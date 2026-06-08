/**
 * 管理模块
 */
export default {
  namespaced: true,

  state: () => ({
    /** 在线用户数 */
    onlineCount: 0,
    /** 系统配置 */
    config: {}
  }),

  getters: {
    /** 是否有在线用户 */
    hasOnline: (state) => state.onlineCount > 0
  },

  mutations: {
    /** 更新在线用户数 */
    UPDATE_ONLINE(state, count) {
      state.onlineCount = count
    },
    /** 更新系统配置 */
    UPDATE_CONFIG(state, config) {
      Object.assign(state.config, config)
    }
  },

  actions: {
    /**
     * 获取系统概览
     * 引用了 user 模块的状态
     */
    async fetchOverview({ commit, rootState }) {
      const userName = rootState.user.name
      commit('UPDATE_ONLINE', 42)
    }
  }
}
