import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '../auth'

/**
 * 购物车状态管理
 */
export const useCartStore = defineStore('cart', () => {
  /** 购物车商品列表 */
  const items = ref([])

  /** 购物车总价 */
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  /** 商品数量 */
  const totalCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  /**
   * 添加商品到购物车
   * @param item 商品信息
   */
  async function addItem(item) {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      throw new Error('请先登录')
    }
    const existing = items.value.find(i => i.id === item.id)
    if (existing) {
      existing.quantity += item.quantity
    } else {
      items.value.push(item)
    }
  }

  /** 清空购物车 */
  function clearCart() {
    items.value = []
  }

  /**
   * 结算
   * 依赖 auth store 获取认证信息
   */
  async function checkout() {
    const authStore = useAuthStore()
    // 使用 authStore.authHeader 发送请求
    items.value = []
  }

  return { items, totalPrice, totalCount, addItem, clearCart, checkout }
})
