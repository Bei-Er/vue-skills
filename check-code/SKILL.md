---
name: check-code
description: 当需要审查 Vue 3 前端代码（.vue、.js、.ts 文件）中的明显错误和明显可优化的地方时使用。逐项检查响应性、模板、性能、资源清理等常见问题。
---

# Vue 3 代码检查

## 概述

对 .vue、.js、.ts 文件逐项扫描，发现明显的正确性错误和性能优化点。按分类清单检查，确保不遗漏。

## 适用场景

- 审查现有代码的质量
- 新功能开发完成后做自检
- 代码评审时作为检查清单

不适用于：架构设计审查、TypeScript 类型系统层面的深度审查。

## 检查清单

按以下分类逐项检查，每个分类内的条目无优先级之分。

### 1. 响应性

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| 基本类型响应性 | `reactive(0)` / `reactive(false)` / `reactive('')` | 使用 `ref` |
| 解构丢失响应性 | `const { x } = reactive({...})` | 使用 `toRefs` 或直接访问 `state.x` |
| 直接修改 props | `props.xxx = newVal` | 使用 `emit` 通知父组件 |
| ref 嵌套 reactive | `ref(reactive({...}))` | 只用 `ref` 或只用 `reactive` |
| watch 监听 reactive 属性值 | `watch(state.count, cb)` | `watch(() => state.count, cb)` |

### 2. 资源清理

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| 定时器泄漏 | `setInterval/setTimeout` 未清理 | 在 `onUnmounted` 中 `clearInterval/clearTimeout`，或在 `watch` 回调中返回清理函数 |
| 事件监听泄漏 | `addEventListener` 无对应 `removeEventListener` | 在 `onUnmounted` 中移除 |
| 自定义监听未停止 | `watch` 返回值未使用 | 调用 `const stop = watch(...)` 并在适当时机 `stop()` |

### 3. 模板

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| v-if + v-for 同元素 | `<div v-for="x in list" v-if="x.active">` | 用 `computed` 过滤，或将 `v-if` 移到内层元素 |
| v-for 缺少 key | `<div v-for="x in list">` | 添加 `:key="x.id"` 或唯一标识 |
| 内联函数/对象 | `@click="() => fn()"` / `:style="{ color: 'red' }"` | 提取为方法或 `computed`，避免不必要重渲染 |

### 4. 计算与监听

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| computed 含副作用 | `computed(() => { console.log(...); return x })` | computed 只做纯计算，副作用放 `watch` |
| 可替换为 computed 的函数 | `function getCount() { return list.value.length }` | 使用 `computed` 获得缓存 |
| 不必要的响应式 | `const API = ref('https://...')` / `const MAX = ref(10)` | 不变常量使用普通 `const` |
| watch + immediate 可简化 | `watch(src, cb, { immediate: true })` | 无需旧值时可用 `watchEffect` |

### 5. 性能

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| 大对象深度响应 | `ref(largeObject)` | 使用 `shallowRef`，仅在需要时 `triggerRef` 手动触发 |
| 大数组深度响应 | `reactive(largeArray)` | 使用 `shallowReactive` 或 `shallowRef` |

## 输出格式

对每个发现的问题，给出：

- **严重程度：** 错误 / 性能 / 建议
- **问题描述：** 一句话
- **所在位置：** 文件名 + 行号
- **修改建议：** 正确做法

按严重程度排序：错误 → 性能 → 建议。

## 检查范围

- 仅检查列出的清单项，不做架构层面或设计模式的评价
- 不修改代码，只报告发现
- 不确定的项标注为"建议"而非"错误"
