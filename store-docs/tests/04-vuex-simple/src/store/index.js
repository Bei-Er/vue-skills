import Vuex from 'vuex'

/**
 * 全局状态管理
 */
export default new Vuex.Store({
  state: {
    /** 全局加载状态 */
    loading: false,
    /** 全局提示消息 */
    message: '',
    /** 主题设置 */
    theme: 'light'
  },

  getters: {
    /** 是否正在加载 */
    isLoading: (state) => state.loading,
    /** 当前主题 */
    currentTheme: (state) => state.theme
  },

  mutations: {
    /** 设置加载状态 */
    SET_LOADING(state, status) {
      state.loading = status
    },
    /** 设置提示消息 */
    SET_MESSAGE(state, msg) {
      state.message = msg
    },
    /** 切换主题 */
    TOGGLE_THEME(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    }
  },

  actions: {
    /**
     * 显示提示消息
     * @param {string} msg 消息内容
     * @param {number} duration 显示时长
     */
    showMessage({ commit }, { msg, duration = 3000 }) {
      commit('SET_MESSAGE', msg)
      setTimeout(() => commit('SET_MESSAGE', ''), duration)
    }
  }
})
