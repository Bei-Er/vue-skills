<script setup lang="ts">
import { ref, onMounted } from 'vue'

const results = ref<string[]>([])
const query = ref('')
const loading = ref(false)
let currentRequest = 0

// 1: 竞态条件 — 没有用请求序号或 AbortController 取消旧请求
async function search() {
  loading.value = true
  const res = await fetch(`/api/search?q=${query.value}`)
  const data = await res.json()
  results.value = data.items
  loading.value = false
}

// 2: 组件卸载后仍更新状态 — 没有卸载检查
async function loadData() {
  const res = await fetch('/api/data')
  const data = await res.json()
  results.value = data.items
}

// 3: Promise 未处理
fetch('/api/ping')

// 4: 定时器泄漏 — setInterval 未清理
onMounted(() => {
  setInterval(() => {
    console.log('polling...')
  }, 5000)
})

// 5: 事件监听泄漏
onMounted(() => {
  window.addEventListener('resize', () => {
    console.log('resized')
  })
})

// 6: 异步函数缺少错误处理
async function save() {
  const res = await fetch('/api/save', { method: 'POST' })
  const data = await res.json()
  return data
}
</script>
