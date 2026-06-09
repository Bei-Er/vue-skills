---
name: vue-skills:directive-docs
description: 当需要为 Vue 项目的自定义指令生成 README.md 文档时使用。扫描指令定义源文件，提取钩子函数、绑定值类型、指令参数、修饰符，生成结构化的指令 API 文档。
---

# 自定义指令文档生成

## 概述

扫描 Vue 项目的自定义指令目录，为每个指令在 `docs/directives/` 下生成独立的 .md 文件。每个文件包含该指令的使用示例、指令值、指令参数、修饰符、钩子函数说明。

## 适用场景

- 为 Vue 项目的 `src/directives/` 目录下的自定义指令批量生成文档
- 已有的指令文档需要更新或补充
- 新增了自定义指令，需要同步更新对应文件夹的文档

## 核心流程

### 第 1 步：定位目标目录

按以下优先级查找指令定义：

1. `src/directives/` 目录
2. `src/directive/` 目录
3. 用户指定的路径

### 第 2 步：确认生成范围

在开始执行前，询问用户生成范围：

- **全部生成** — 为 directives 下所有指令生成/更新文档
- **局部生成** — 用户指定具体指令路径或名称，只处理指定的部分

### 第 3 步：发现指令文件

遍历 directives 目录，识别需要处理的文件。

```
src/directives/
├── clickOutside.js       ← 根目录文件，处理
├── focus.ts              ← 根目录文件，处理
├── permission/
│   └── index.ts          ← 子文件夹，只处理 index
├── lazy/
│   └── index.js          ← 子文件夹，只处理 index
└── types.d.ts            ← 纯类型文件，忽略
```

**规则：**
- 子文件夹 → 只处理 `index.js`、`index.ts`、`index.mjs`、`index.mts`
- 根目录 → 处理所有 `.js`、`.mjs`、`.ts`、`.mts` 文件
- 纯类型文件（`.d.ts`）→ 忽略

### 第 4 步：扫描指令定义

读取源文件，识别指令的定义方式：

**写法 A：对象形式（完整钩子）**

```js
export const vFocus = {
  mounted(el, binding) {
    el.focus()
  }
}

// 或默认导出
export default {
  mounted(el, binding) { ... },
  unmounted(el, binding) { ... }
}
```

**写法 B：函数简写（mounted + updated）**

```js
export const vFocus = (el, binding) => {
  el.focus()
}
```

**写法 C：插件批量注册**

```js
export default {
  install(app) {
    app.directive('focus', {
      mounted(el) { el.focus() }
    })
    app.directive('permission', (el, binding) => { ... })
  }
}
```

提取：
1. **钩子函数** — 对象形式提取每个钩子；函数简写视为 `mounted` + `updated`
2. **绑定值类型** — 从钩子函数体内 `binding.value` 的使用推断
3. **指令参数** — 从 `binding.arg` 的条件分支推断可选值
4. **修饰符** — 从 `binding.modifiers` 的属性访问推断可选项
5. **注释** — JSDoc 注释（`/** ... */`）

### 第 5 步：提取指令元数据

对每个指令，收集以下信息：

**钩子函数：**

| 字段 | 来源 | 示例 |
|------|------|------|
| 钩子名 | 对象的键名 | `mounted`、`updated` |
| 说明 | JSDoc 注释 | 元素挂载时自动聚焦 |

**绑定值（binding.value）：**

| 字段 | 来源 | 示例 |
|------|------|------|
| 类型 | 函数体内对 value 的使用 | `string`、`boolean`、`Function` |
| 说明 | JSDoc 或从逻辑推断 | 权限标识 |

**指令参数（binding.arg）：**

| 字段 | 来源 | 示例 |
|------|------|------|
| 参数值 | 条件分支中的 arg 比对 | `'top'`、`'bottom'` |
| 说明 | JSDoc 或推断 | 从上方出现 |

**修饰符（binding.modifiers）：**

| 字段 | 来源 | 示例 |
|------|------|------|
| 修饰符名 | modifiers 对象的属性访问 | `lazy`、`immediate` |
| 说明 | JSDoc 或推断 | 延迟执行 |

**提取规则：**
- 函数简写 → 文档化为 `mounted` + `updated` 两个钩子
- 从 `binding.value` 的操作推断类型（字符串拼接 → `string`，布尔判断 → `boolean`，函数调用 → `Function`）
- 从 `if (binding.arg === 'xxx')` 分支提取参数可选值
- 从 `binding.modifiers.xxx` 属性访问提取修饰符
- 默认导出时从文件名推断指令名
- 插件注册时从 `app.directive('name', ...)` 第一个参数获取指令名
- 没有 JSDoc 时从钩子函数体逻辑推断说明

### 第 6 步：统计指令引用次数

在 `src/` 目录下（排除指令自身文件）搜索 import 语句，统计引用次数。

**搜索规则：**
- 使用指令的导出名（如 `vFocus`、`vPermission`）作为搜索关键字
- 匹配 `import { vDirectiveName }` 和 `import vDirectiveName` 两种形式
- 排除指令源文件本身
- 只搜索 `src/` 目录下的 `.vue`、`.js`、`.ts` 文件

### 第 7 步：生成文档

使用下方模板，输出到 `docs/directives/`。

**输出文件命名：**
- 子文件夹指令 → 文件夹名（如 `permission/` → `permission.md`）
- 根目录文件 → 文件名去扩展名（如 `focus.ts` → `focus.md`、`vFocus.ts` → `vfocus.md`）

## README 模板

````markdown
# 自动聚焦(2)

（标题格式：中文名称(引用次数)，从指令名、JSDoc、功能推断中文名称）

---

## 使用示例

```vue
<template>
  <input v-focus />
</template>
```

---

## 指令值

| 类型 | 说明 |
|------|------|
| `boolean` | 是否显示加载状态 |

---

## 指令参数

| 参数 | 说明 |
|------|------|
| `top` | 从上方出现 |
| `bottom` | 从下方出现 |

---

## 修饰符

| 修饰符 | 说明 |
|--------|------|
| `.lazy` | 延迟执行 |

---

## 钩子函数

| 钩子 | 说明 |
|------|------|
| mounted | 元素挂载时自动聚焦 |
| unmounted | 元素卸载时清除定时器 |
````

### 模板规则

- 标题格式为 `中文名称(引用次数)`，从指令名、JSDoc、功能推断中文名称
- **使用示例** 展示模板中典型用法，包含指令值、参数、修饰符
- **指令值** 表格列出 `binding.value` 期望的类型和说明
- **指令参数** 表格列出 `v-name:arg` 中 arg 的可选值和说明
- **修饰符** 表格列出 `v-name.mod` 中 mod 的可选项和说明
- **钩子函数** 表格列出指令定义中使用的钩子及说明
- 没有对应内容的节直接省略，不显示空表
- `---` 分隔使用示例和各 API 节，各 API 节之间也用 `---` 分隔
- 函数简写形式在钩子函数节中显示为 `mounted` + `updated`

## 边界情况处理

| 场景 | 处理方式 |
|------|----------|
| 函数简写形式 | 文档化为 `mounted` + `updated` 两个钩子 |
| 默认导出（无指令名） | 从文件名推断指令名 |
| 插件批量注册 | 从 `app.directive('name', ...)` 提取每个指令，各自生成文档 |
| 组件内局部指令（`directives` 选项） | 不处理，属于组件文档范围 |
| 无 JSDoc 注释 | 从钩子函数体逻辑推断功能说明 |
| TS 泛型指令 | 保留泛型类型参数 |
| 指令内部辅助函数 | 只文档化导出的指令定义，忽略内部工具函数 |
| JS 文件无类型注解 | 从函数体内 `binding.value` 的操作推断类型 |
| 指令无绑定值（如 `v-focus`） | 省略指令值节 |

## 常见错误

| 错误 | 正确做法 |
|------|----------|
| 把组件内局部指令单独生成文档 | 组件内 `directives` 属于组件，不单独生成 |
| 忽略默认导出 | 检查 `export default` 定义 |
| 把工具函数当指令 | 只处理有钩子函数特征的对象或函数简写 |
| 文档化了所有 7 个钩子（含未使用的） | 只文档化定义中实际存在的钩子 |
| 把文档生成到 src/directives/ 内 | 放在 `docs/directives/` 目录内 |
| 函数简写只显示一个钩子 | 函数简写 = `mounted` + `updated`，两个都要显示 |
