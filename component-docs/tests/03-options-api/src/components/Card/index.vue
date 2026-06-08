<script>
/**
 * 卡片容器组件，支持标题、阴影和自定义内边距
 */
export default {
  name: 'Card',
  props: {
    /** 卡片标题 */
    title: {
      type: String,
      default: ''
    },
    /** 是否显示阴影 */
    shadow: {
      type: Boolean,
      default: true
    },
    /** 内边距 */
    padding: {
      type: [Number, String],
      default: 16
    },
    /** 边框圆角 */
    radius: {
      type: String,
      required: false,
      default: '8px'
    }
  },
  emits: ['click', 'close'],
  methods: {
    /** 点击卡片 */
    handleClick(e) {
      this.$emit('click', e)
    },
    /** 关闭卡片 */
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<template>
  <div
    class="card"
    :class="{ 'card--shadow': shadow }"
    :style="{ padding: padding + 'px', borderRadius: radius }"
    @click="handleClick"
  >
    <div v-if="title || $slots.header" class="card-header">
      <slot name="header">
        <h3>{{ title }}</h3>
      </slot>
      <button class="card-close" @click.stop="handleClose">✕</button>
    </div>
    <div class="card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
