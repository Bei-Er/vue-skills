# 期望发现的问题

## 正确性

| # | 问题 | 位置 |
|---|------|------|
| 1 | `reactive(false)` 用于基本类型，应使用 `ref` | 第 15 行 |
| 2 | 解构 `reactive` 对象 `{ theme, locale }` 丢失响应性 | 第 21 行 |
| 9 | 直接修改 `props.title` | 第 59 行 |
| 4 | `setInterval` 未清理，定时器泄漏 | 第 33 行 |
| 5 | `resize` 事件监听未在 `onUnmounted` 中移除 | 第 42 行 |
| 10 | `v-for` + `v-if` 在同一元素 | 第 63 行 |
| 11 | `v-for` 缺少 `key` | 第 68 行 |

## 性能

| # | 问题 | 位置 |
|---|------|------|
| 3 | `computed` 中包含 `console.log` 副作用 | 第 27 行 |
| 6 | `watch` 仅赋值 `document.title`，应使用 `watchEffect` 或 `watch` 的 `immediate` | 第 48 行 |
| 7 | `getUserCount` 应为 `computed` | 第 53 行 |
| 8 | 大型静态数据使用 `ref`（深度响应），应使用 `shallowRef` | 第 57 行 |
| 12 | 模板中内联箭头函数导致每次渲染创建新引用 | 第 72 行 |
