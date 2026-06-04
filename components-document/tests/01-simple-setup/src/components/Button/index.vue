<script setup>
/**
 * 通用按钮组件
 */

const props = defineProps({
  /** 按钮类型 */
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 按钮尺寸 */
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})
</script>

<template>
  <button
    :class="['btn', `btn-${type}`, `btn-${size}`]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
