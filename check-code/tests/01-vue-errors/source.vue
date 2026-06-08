<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'

interface User {
  id: number
  name: string
  active: boolean
}

// 1: reactive 用于基本类型，应该用 ref
const loading = reactive(false)

// 2: 解构 reactive 对象，丢失响应性
const config = reactive({
  theme: 'dark',
  locale: 'zh-CN',
  pageSize: 10
})
const { theme, locale } = config

const users = ref<User[]>([])
const searchKey = ref('')

// 3: computed 中有副作用
const filteredUsers = computed(() => {
  console.log('filtering', users.value.length)
  return users.value.filter(u => u.name.includes(searchKey.value))
})

// 4: watch 没有清理定时器
watch(loading, (val) => {
  if (val) {
    setInterval(() => {
      console.log('still loading...')
    }, 1000)
  }
})

// 5: 事件监听没有在 onUnmounted 中清理
onMounted(() => {
  window.addEventListener('resize', () => {
    console.log('resized')
  })
})

// 6: 应该用 computed 代替 watch
watch(searchKey, () => {
  document.title = `Search: ${searchKey.value}`
})

// 7: 每次渲染都创建新函数，应该用 computed
function getUserCount() {
  return users.value.length
}

// 8: 大型静态数据用 ref（深度响应），应该用 shallowRef
const staticConfig = ref({
  api: 'https://api.example.com',
  version: '1.0.0',
  endpoints: {
    users: '/users',
    posts: '/posts',
    comments: '/comments'
  }
})

// 9: 直接修改 props
const props = defineProps<{ title: string }>()
props.title = 'new title'
</script>

<template>
  <!-- 10: v-if 和 v-for 在同一元素 -->
  <div v-for="user in users" v-if="user.active">
    {{ user.name }}
  </div>

  <!-- 11: v-for 缺少 key -->
  <span v-for="tag in tags">
    {{ tag }}
  </span>

  <!-- 12: 内联箭头函数导致不必要重渲染 -->
  <button @click="() => fetchUsers()">Refresh</button>
</template>
