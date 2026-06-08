# 期望发现的问题

## 正确性

| # | 问题 | 位置 |
|---|------|------|
| 2 | `watch(state.count, ...)` 监听 reactive 属性值而非 getter，应该用 `watch(() => state.count, ...)` | 第 12 行 |

## 性能

| # | 问题 | 位置 |
|---|------|------|
| 1 | `ref(reactive({...}))` 双重包装，reactive 已是响应式，ref 包装多余 | 第 3 行 |
| 4 | `computed` 中 `[...items.value].sort()` 每次创建新数组，如果仅排序不会变化应缓存 | 第 26 行 |
| 5 | 常量 `API_URL` 和 `MAX_RETRY` 不需要响应性，应使用普通 `const` | 第 31-32 行 |
| 7 | `watch` + `immediate: true` 可以简化为 `watchEffect` | 第 41 行 |

## 可维护性

| # | 问题 | 位置 |
|---|------|------|
| 3 | composable 返回 `reactive` 对象，调用方解构会丢失响应性，应使用 `toRefs` 或返回 `ref` | 第 17-24 行 |
| 6 | `reactive` 数组使用索引赋值，虽然 Vue 3 支持，但 `push` 语义更清晰 | 第 35 行 |
