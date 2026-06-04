<script setup>
const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    required: true,
    validator: (value) => ['idle', 'loading', 'error', 'success'].includes(value)
  },
  callback: {
    type: Function,
    default: undefined
  },
  count: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['change', 'delete'])

function reset() {
  emit('change', { page: 1 })
}

function remove(index) {
  emit('delete', index)
}

defineExpose({ reset, remove })
</script>

<template>
  <div class="data-list">
    <div v-for="item in items" :key="item.id">
      <slot name="item" :item="item" :remove="() => remove(item.id)" />
    </div>
    <slot />
  </div>
</template>
