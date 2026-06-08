---
name: components-document
description: 当需要为 Vue 项目的组件目录生成 README.md 文档时使用。扫描 Vue 组件源文件，提取 Props、Events、Slots、Exposes，生成结构化的组件 API 文档。
---

# 组件文档生成

## 概述

扫描 Vue 项目的 components 目录，为每个组件在 `docs/components/` 下生成独立的 .md 文件。每个文件包含该组件的 Props、Events、Slots、Exposes 和使用示例。

## 适用场景

- 为 Vue 项目的 `src/components/` 目录下的组件批量生成文档
- 已有的组件 README.md 需要更新或补充
- 新增了组件，需要同步更新对应文件夹的文档

## 核心流程

### 第 1 步：定位目标目录

默认扫描 `src/components/` 目录。用户指定了其他目录时使用用户指定的路径。

### 第 2 步：确认生成范围

在开始执行前，询问用户生成范围：

- **全部生成** — 为 components 下所有组件生成/更新文档
- **局部生成** — 用户指定具体组件路径或名称，只处理指定的部分

### 第 3 步：发现组件文件

遍历 components 目录，识别 `.vue` 组件文件。

```
src/components/
├── Button/
│   └── index.vue
├── Dialog/
│   └── Dialog.vue
├── button.vue       ← 根目录的 .vue 文件，也处理
└── common.ts        ← 非 .vue 文件，忽略
```

**规则：**
- 子文件夹 → 只处理 `index.vue` 或与文件夹同名的 `.vue` 文件
- 根目录 → 处理所有 `.vue` 文件
- 非 `.vue` 文件 → 忽略

### 第 4 步：扫描组件源文件

读取目标 `.vue` 文件，根据 `<script>` 标签识别组件写法：

**写法 A：`<script setup>`**

选项式（推荐，纯 JS）：

```
<script setup>
const props = defineProps({
  propName: { type: String, default: 'value' }
})
const emit = defineEmits(['eventName'])
defineExpose({ methodName })
</script>
```

泛型式（TS）：

```
<script setup lang="ts">
interface Props { ... }
const props = defineProps<Props>()
const emit = defineEmits<{ ... }>()
defineExpose({ ... })
</script>
```

提取：
1. **Props** — `defineProps` 的选项式参数或泛型参数
2. **Events** — `defineEmits` 的字符串数组、对象或泛型参数
3. **Exposes** — `defineExpose` 的对象
4. **Slots** — `<template>` 中的 `<slot>` 标签
5. **注释** — JSDoc 注释（`/** ... */`）和行内注释

**写法 B：Options API**

```
<script>
export default {
  props: { ... },
  emits: [...],
  methods: { ... }
}
</script>
```

提取：
1. **Props** — `props` 选项中的每个属性
2. **Events** — `emits` 选项中的每个事件
3. **Methods** — `methods` 中的公共方法（作为 Exposes）
4. **Slots** — `<template>` 中的 `<slot>` 标签
5. **注释** — JSDoc 注释

### 第 5 步：提取组件元数据

对每个组件，收集以下信息：

**Props：**

| 字段 | 来源 | 示例 |
|------|------|------|
| 属性名 | defineProps 参数 | `type` |
| 类型 | TS 类型或 props.type | `'primary' \| 'secondary'` |
| 必填 | 是否有默认值 | 是 / 否 |
| 默认值 | withDefaults 或 default | `'primary'` |
| 说明 | JSDoc 注释 | 按钮类型 |

**Events：**

| 字段 | 来源 | 示例 |
|------|------|------|
| 事件名 | defineEmits 参数 | `confirm` |
| 参数 | 签名中的参数 | `(value: boolean)` |
| 说明 | JSDoc 注释 | 点击确定时触发 |

**Slots：**

| 字段 | 来源 | 示例 |
|------|------|------|
| 插槽名 | `<slot name="xxx">` | `header` |
| 作用域参数 | `<slot :prop="value">` | `{ close }` |
| 说明 | JSDoc 或推断 | 自定义头部内容 |

**Exposes：**

| 字段 | 来源 | 示例 |
|------|------|------|
| 名称 | defineExpose 的键 | `open` |
| 类型 | 函数签名 | `() => void` |
| 说明 | 上方 JSDoc 注释 | 打开对话框 |

**提取规则：**
- Props 类型从 props 选项的 `type` 字段、`validator` 或 TypeScript 接口提取；`withDefaults` 提供默认值，选项式中直接读取 `default` 字段
- 没有 JSDoc 时，从属性名、类型、用法推断说明
- Events 从 `defineEmits` 的调用签名或字符串数组提取
- Slots 从 `<slot>` 标签提取，`default` 为无 name 的 slot
- Exposes 从 `defineExpose` 的对象键提取；Options API 的 methods 作为 Exposes
- 组件说明从 JSDoc、组件名、Props 用途、模板结构等上下文综合推断

### 第 6 步：生成文档

使用下方模板，输出到 `docs/components/`。

**输出文件命名：**
- 子文件夹组件 → 文件夹名（如 `Button/` → `Button.md`）
- 根目录组件 → 文件名去扩展名（如 `button.vue` → `button.md`）

### 第 7 步：更新侧边栏

调用 `update-docsify` 更新侧边栏。除非用户明确指定不需要更新。

## README 模板

````markdown
# ComponentName

组件说明（从 JSDoc、组件名、Props、模板结构等上下文综合推断）

---

## 示例

```vue
<ComponentName prop="value" @event="handler">
  <template #slotName="scope">
    content
  </template>
</ComponentName>
```

---

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| propName | `Type` | 是/否 | `defaultValue` | 属性说明 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| eventName | `(param: Type)` 或 — | 事件说明 |

## Slots

| 插槽名 | 作用域参数 | 说明 |
|--------|-----------|------|
| slotName | `{ prop }` 或 — | 插槽说明 |

## Exposes

| 名称 | 类型 | 说明 |
|------|------|------|
| methodName | `() => void` | 方法说明 |
````

### 模板规则

- 组件名从文件名或 `name` 选项推断，去除 `.vue` 扩展名，使用 PascalCase
- 组件说明从 JSDoc、组件名、Props 用途、模板结构等上下文综合推断
- **Props** 表格按源码中定义的顺序排列
- **Events** 表格中，无参数的事件参数列显示 `—`
- **Slots** 表格中，无作用域参数的显示 `—`
- **Exposes** 表格，只有使用了 `defineExpose` 或 Options API 有 `methods` 时才显示此节
- **示例** 根据组件的 Props、Events、Slots 生成一个完整的使用示例
- 没有对应 API 的节（如无 Events）直接省略该节，不显示空表
- `---` 放在组件说明和第一个 API 节之间

## 边界情况处理

| 场景 | 处理方式 |
|------|----------|
| 无 JSDoc 注释 | 从属性名、类型、上下文推断说明 |
| `withDefaults` 提供默认值 | 标记为非必填，显示默认值 |
| 没有 `withDefaults` 的可选属性 | 标记为非必填，默认值显示 `-` |
| `defineEmits` 使用字符串数组 | 从 emit 调用处推断参数类型 |
| Options API 的 `emits` 为数组 | 从 `$emit` 调用处推断参数 |
| Options API 的 `emits` 为对象 | 提取每个键作为事件，值作为验证函数 |
| v-model 双向绑定 | 识别 `modelValue` + `update:modelValue`，文档化 `modelValue` prop 和 `update:modelValue` event |
| 作用域插槽 | 提取 `<slot>` 上的 `:prop="value"` 绑定 |
| 无 `defineExpose` | 省略 Exposes 节 |
| JS 组件（无 TypeScript） | 类型从 JSDoc 提取，都没有则类型显示 `-` |
| 泛型组件 | 保留泛型类型参数 |

## 常见错误

| 错误 | 正确做法 |
|------|----------|
| 文档化了内部状态（ref、reactive） | 只文档化 Props、Events、Slots、Exposes |
| 把 methods 当作 Exposes（setup 组件） | setup 组件只有 `defineExpose` 的内容才是 Exposes |
| 忽略 default slot | 无 `name` 的 `<slot>` 是 default 插槽 |
| 把路由 props 当作组件 props | 只处理组件文件的 `defineProps` 或 `props` 选项 |
| 把文档生成到 src/components/ 内 | 放在 `docs/components/` 目录内 |
| 对每个事件都写 `this.$emit` 参数 | 只在 emits 声明处提取，从调用处补充参数类型 |
