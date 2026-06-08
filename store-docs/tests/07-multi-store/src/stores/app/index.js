import { defineStore } from 'pinia'

/** 应用全局状态 */
export const useAppStore = defineStore('app', {
  state: () => ({
    /** 侧边栏是否折叠 */
    sidebarCollapsed: false,
    /** 页面标题 */
    pageTitle: '首页'
  }),

  actions: {
    /** 切换侧边栏 */
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    }
  }
})

/** 通知状态 */
export const useNotificationStore = defineStore('notification', {
  state: () => ({
    /** 未读数量 */
    unreadCount: 0
  }),

  getters: {
    /** 是否有未读通知 */
    hasUnread: (state) => state.unreadCount > 0
  }
})
