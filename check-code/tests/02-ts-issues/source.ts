import { ref, reactive, computed, watch } from 'vue'

// 1: ref 嵌套了 reactive，多余
const form = ref(reactive({
  name: '',
  age: 0
}))

// 2: watch 监听 reactive 对象的某个属性，应该用 getter
const state = reactive({
  count: 0,
  name: 'test'
})
watch(state.count, (val) => {
  console.log(val)
})

// 3: 没有使用 toRefs 解构 reactive props
// （在 composable 中返回 reactive 对象时）
function useUser() {
  const user = reactive({
    id: 1,
    name: 'Alice'
  })
  return { user }
}
// 调用方解构后丢失响应性：
// const { user } = useUser() — 这里 user 是普通对象

// 4: 计算属性返回新数组/对象，每次都触发更新
const items = ref([1, 2, 3])
const sorted = computed(() => {
  return [...items.value].sort((a, b) => b - a)
})

// 5: 使用 ref 包裹不需要响应性的常量
const API_URL = ref('https://api.example.com')
const MAX_RETRY = ref(3)

// 6: reactive 数组使用索引直接赋值（在 Vue 3 中可行但易混淆）
const list = reactive<number[]>([])
list[0] = 1 // Vue 3 支持，但可能意图不明确

// 7: watch immediate 场景应该用 watchEffect
watch(state, () => {
  localStorage.setItem('state', JSON.stringify(state))
}, { immediate: true })
