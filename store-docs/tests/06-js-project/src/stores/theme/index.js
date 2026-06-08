import { defineStore } from 'pinia'

/**
 * 主题状态管理
 */
export const useThemeStore = defineStore('theme', {
  state: () => ({
    /** 当前主题 */
    mode: 'light',
    /** 主色调 */
    primaryColor: '#409eff',
    /** 是否跟随系统 */
    followSystem: true
  }),

  getters: {
    /** 是否为暗色主题 */
    isDark: (state) => state.mode === 'dark'
  },

  actions: {
    /**
     * 切换主题
     * @param {string} mode 主题模式
     */
    setMode(mode) {
      this.mode = mode
    },
    /**
     * 设置主色调
     * @param {string} color 颜色值
     */
    setPrimaryColor(color) {
      this.primaryColor = color
    }
  }
})
