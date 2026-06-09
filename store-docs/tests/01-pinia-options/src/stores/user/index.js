import { defineStore } from 'pinia'

/**
 * 用户状态管理
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    /** 当前用户信息 */
    userInfo: null,
    /** 登录 token */
    token: '',
    /** 是否已登录 */
    isLoggedIn: false
  }),

  getters: {
    /** 用户显示名称 */
    displayName: (state) => state.userInfo?.name ?? '未登录',
    /** 是否为 VIP 用户 */
    isVip: (state) => state.userInfo?.id !== null && (state.userInfo?.id ?? 0) > 1000
  },

  actions: {
    /**
     * 登录
     * @param {string} username 用户名
     * @param {string} password 密码
     */
    async login(username, password) {
      // 登录逻辑
    },
    /** 退出登录 */
    logout() {
      this.userInfo = null
      this.token = ''
      this.isLoggedIn = false
    },
    /**
     * 更新用户信息
     * @param {Partial<UserInfo>} info 新的用户信息
     */
    updateUserInfo(info) {
      if (this.userInfo) {
        Object.assign(this.userInfo, info)
      }
    }
  }
})
