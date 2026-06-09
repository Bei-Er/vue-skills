import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * 计数器状态管理
 */
export const useCounterStore = defineStore('counter', () => {
  /** 当前计数 */
  const count = ref(0)
  /** 步长 */
  const step = ref(1)

  /** 计数的两倍 */
  const doubleCount = computed(() => count.value * 2)
  /** 是否为正数 */
  const isPositive = computed(() => count.value > 0)

  /**
   * 增加计数
   * @param {number} [n] 增加的值，默认使用 step
   */
  function increment(n) {
    count.value += n ?? step.value
  }

  /** 减少计数 */
  function decrement() {
    count.value -= step.value
  }

  /**
   * 重置计数器
   * @param {number} [value=0] 重置到的值
   */
  async function reset(value = 0) {
    count.value = value
  }

  return { count, step, doubleCount, isPositive, increment, decrement, reset }
})
