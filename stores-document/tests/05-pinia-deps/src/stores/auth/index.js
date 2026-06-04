import { defineStore } from 'pinia'

/**
 * 认证状态管理
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    /** 认证 token */
    token: '',
    /** 是否已认证 */
    isAuthenticated: false
  }),

  getters: {
    /** 认证头信息 */
    authHeader: (state) => ({ Authorization: `Bearer ${state.token}` })
  },

  actions: {
    /**
     * 登录
     * @param username 用户名
     * @param password 密码
     */
    async login(username, password) {
      this.token = 'mock-token'
      this.isAuthenticated = true
    },
    /** 退出登录 */
    logout() {
      this.token = ''
      this.isAuthenticated = false
    }
  }
})
