<script setup>
/**
 * 对话框组件，支持自定义头部和底部插槽
 */

const props = defineProps({
  /** 是否显示对话框 */
  modelValue: {
    type: Boolean,
    required: true
  },
  /** 对话框标题 */
  title: {
    type: String,
    required: true
  },
  /** 对话框宽度 */
  width: {
    type: String,
    default: undefined
  },
  /** 点击遮罩层是否关闭 */
  closeOnClickModal: {
    type: Boolean,
    default: undefined
  }
})

const emit = defineEmits({
  /** 显示状态变化时触发 */
  'update:modelValue': (value) => typeof value === 'boolean',
  /** 点击确定按钮时触发 */
  confirm: () => true,
  /** 点击取消按钮时触发 */
  cancel: () => true
})

/** 打开对话框 */
function open() {
  emit('update:modelValue', true)
}

/** 关闭对话框 */
function close() {
  emit('update:modelValue', false)
}

defineExpose({
  open,
  close
})
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="dialog-overlay" @click="closeOnClickModal && close()">
      <div class="dialog" :style="{ width: width || '400px' }">
        <div class="dialog-header">
          <slot name="header">
            <h3>{{ title }}</h3>
          </slot>
        </div>
        <div class="dialog-body">
          <slot />
        </div>
        <div class="dialog-footer">
          <slot name="footer" :close="close" :confirm="() => emit('confirm')">
            <button @click="close">取消</button>
            <button @click="emit('confirm')">确定</button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
