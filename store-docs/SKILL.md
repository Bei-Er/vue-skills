---
name: vue-skills:store-docs
description: 当需要为 Vue 项目的状态管理层（Pinia / Vuex）生成 README.md 文档时使用。扫描 store 源文件，提取 State、Getters、Actions、Mutations 和依赖关系，生成结构化的 API 文档。
---

# Store 文档生成

## 概述

扫描 Vue 项目的状态管理目录，为每个 store 在 `docs/stores/` 下生成独立的 .md 文件。自动检测 Pinia / Vuex 类型，使用对应的提取规则和文档模板。

## 适用场景

- 为 Vue 项目的 `src/stores/` 或 `src/store/` 目录生成/更新文档
- 新增了 store，需要同步更新文档
- 项目使用 Pinia（Options 或 Setup 写法）或 Vuex

## 核心流程

### 第 1 步：定位目标目录

按以下优先级查找：

1. `src/stores/`
2. `src/store/`
3. 用户指定的路径

### 第 2 步：确认生成范围

在开始执行前，询问用户生成范围：

- **全部生成** — 为所有 store 在 `docs/stores/` 下生成/更新 .md 文件
- **局部生成** — 用户指定具体 store 路径或名称，只处理指定的部分

### 第 3 步：发现源文件

扫描目标目录下的所有 `.js`、`.mjs`、`.ts`、`.mts` 文件（包括子文件夹和根目录文件）：

```
src/stores/
├── user/
│   └── index.js
├── index.js         ← 根目录文件，也扫描
└── workflow.ts      ← 根目录文件，也扫描
```

**规则：**
- 递归扫描所有 `.js`、`.mjs`、`.ts`、`.mts` 文件
- 纯类型文件（`.d.ts`）→ 跳过
- 纯 TS 类型文件（无 store 定义）→ 跳过

### 第 4 步：检测 store 类型

通过文件内容判断 Pinia / Vuex：

| 特征 | Pinia | Vuex |
|------|-------|------|
| 导入 | `defineStore` | `new Vuex.Store` / `createStore` |
| 文件内调用 | `defineStore('name', {...})` | `state: () => ({...})` + `mutations` |
| Setup 写法 | `defineStore('name', () => {...})` | 不适用 |

### 第 5 步：提取元数据

根据检测到的类型，使用对应提取规则（见下方 Pinia 提取规则 / Vuex 提取规则）。

### 第 6 步：分析依赖关系

- **Pinia：** 分析文件内 `useXxxStore()` 调用
- **Vuex：** 分析 `dispatch('otherModule/action')`、`rootGetters`、`rootState` 引用

### 第 7 步：生成文档

使用对应模板（Pinia 模板 / Vuex 模板），输出到 `docs/stores/`。

**输出文件命名：**
- 单 store 文件 → 文件名为 store ID（如 `defineStore('user', ...)` → `user.md`）
- 单文件多 store → 文件名为源文件所在的文件夹名，根目录文件使用源文件名去扩展名（如 `index.js` → `index.md`）

## Pinia 提取规则

### Options 写法

```js
export const useUserStore = defineStore('user', {
  state: () => ({ ... }),
  getters: { ... },
  actions: { ... }
})
```

提取：
- **State** — `state()` 返回值的每个属性：属性名、类型、默认值
- **Getters** — `getters` 的每个键：名称、参数、返回类型
- **Actions** — `actions` 的每个方法：名称、参数、返回类型、是否异步

### Setup 写法

```js
export const useUserStore = defineStore('user', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment() { count.value++ }
  return { count, double, increment }
})
```

识别规则：
- `ref()` / `reactive()` → State
- `computed()` → Getters
- `function` → Actions
- 只文档化 `return` 语句中返回的内容

**提取元数据：**

| 字段 | 来源 | 示例 |
|------|------|------|
| 属性名/名称 | 导出标识符 | `count`、`doubleCount` |
| 类型 | TS 类型注解或推断 | `number`、`UserInfo \| null` |
| 默认值 | 初始值 | `0`、`''`、`null`、`false` |
| 说明 | JSDoc 注释 | 当前计数 |
| 参数 | 函数签名 | `(id: string, format?: string)` |
| 返回类型 | 返回类型注解 | `Promise<void>` |

**提取规则：**
- 无 JSDoc 时，从命名和上下文推断说明
- 异步函数返回类型用 `Promise<T>`
- JS 文件无类型注解时，从 JSDoc `@param {Type}` 提取，都没有则类型显示 `-`
- 单文件包含多个 `defineStore` 时，每个 store 单独文档化

## Vuex 提取规则

### 模块化写法

```js
const user = {
  namespaced: true,
  state: () => ({ ... }),
  getters: { ... },
  mutations: { ... },
  actions: { ... }
}
```

### 单文件写法

```js
const store = new Vuex.Store({
  state: { ... },
  getters: { ... },
  mutations: { ... },
  actions: { ... }
})
```

提取：
- **State** — `state()` / `state` 的每个属性
- **Getters** — `getters` 的每个键
- **Mutations** — `mutations` 的每个方法：名称、载荷类型、说明
- **Actions** — `actions` 的每个方法：名称、参数（只文档化 payload）、返回类型

**提取规则：**
- Mutations 载荷从第二个参数类型推断，无载荷时显示 `—`
- Actions 解构参数 `({ commit, dispatch }, payload)` 只文档化 payload 部分
- `namespaced: true` 的模块标注命名空间
- JS 文件从 JSDoc `@param {Type}` 提取类型

## Pinia README 模板

````markdown
# 用户管理

（标题从 store 名、JSDoc、用途推断中文名称）

---

## State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | `string` | `''` | 用户名 |

**示例：**

```js
const store = useUserStore()
console.log(store.name) // => ''
```

## Getters

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| displayName | — | `string` | 用户显示名称 |

**示例：**

```js
const store = useUserStore()
console.log(store.displayName) // => 用户显示名称
```

## Actions

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| login | `(username: string, password: string)` | `Promise<void>` | 登录 |

**示例：**

```js
const store = useUserStore()
await store.login('admin', '123456')
```

---

## 依赖

- `useAuthStore` — 用于获取 token
````

**模板规则：**
- 标题为从 store 名、JSDoc、用途推断的中文名称
- 每个节（State、Getters、Actions）的表格后附带 **示例：** 代码块，展示典型用法
- 无对应 API 的节直接省略（如无 Getters 则省略 Getters 节）
- Getters 无参数时显示 `—`
- Actions 无参数时显示 `—`
- 依赖节：分析 `useXxxStore()` 调用，列出 store 名和用途；无依赖时省略此节
- `---` 分隔正文和依赖节

**单文件多 store 的特殊格式：**

当同一文件包含多个 `defineStore` 时，使用二级标题分隔：

````markdown
# 状态管理

（标题从目录名或文件名推断中文名称）

---

## useAppStore — 应用状态

Store 说明

### State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|

**示例：**

```js
const store = useAppStore()
console.log(store.xxx) // => defaultValue
```

### Actions

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|

**示例：**

```js
const store = useAppStore()
await store.actionName()
```

---

## useNotificationStore — 通知状态

Store 说明

### State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|

**示例：**

```js
const store = useNotificationStore()
console.log(store.xxx) // => defaultValue
```
````

每个 store 内部使用三级标题（`###`）代替二级标题，二级标题格式为 `## useXxxStore — 中文名称`。每个节的表格后同样附带 **示例：** 代码块。

## Vuex README 模板

````markdown
# 用户模块

（标题从模块名、JSDoc、用途推断中文名称）

**命名空间：** `user/`

---

## State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | `string` | `''` | 用户名 |

**示例：**

```js
const name = store.state.user.name
```

## Getters

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| displayName | — | `string` | 用户显示名称 |

**示例：**

```js
const name = store.getters['user/displayName']
```

## Actions

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| login | `(credentials: Object)` | `Promise` | 用户登录 |

**示例：**

```js
await store.dispatch('user/login', { username: 'admin', password: '123456' })
```

## Mutations

| 名称 | 载荷类型 | 说明 |
|------|----------|------|
| SET_NAME | `string` | 设置用户名 |

**示例：**

```js
store.commit('user/SET_NAME', '新用户名')
```

---

## 依赖

- `auth` 模块 — 用于获取 token
````

**模板规则：**
- 标题为从模块名、JSDoc、用途推断的中文名称
- 每个节（State、Getters、Actions、Mutations）的表格后附带 **示例：** 代码块
- `namespaced: true` 的模块在标题下方标注 `**命名空间：**` `xxx/`
- 无命名空间时省略命名空间行
- 无对应 API 的节直接省略
- Mutations 无载荷时显示 `—`
- 依赖节：分析 `rootState`、`rootGetters`、`dispatch('module/action')` 引用；无依赖时省略此节
- 单文件 Vuex Store（非模块化）标题使用中文推断名称

## 边界情况处理

| 场景 | 处理方式 |
|------|----------|
| Pinia Setup 中 `$` 前缀的 ref | 正常提取，文档中不显示 `$` |
| `storeToRefs` 引用的其他 store | 识别为依赖，不将跨 store 的 ref 重复文档化 |
| Vuex `modules` 嵌套 | 每个模块单独生成 .md 文件 |
| 持久化插件配置 | 在文档末尾标注持久化配置 |
| 纯 TS 类型文件（无 store 定义） | 跳过 |
| JS 文件无类型注解 | 类型从 JSDoc `@type` 提取，都没有则显示 `-` |
| 单文件多个 store 定义 | 每个 store 单独文档化，使用二级标题分隔 |
| 泛型 store | 保留泛型类型参数 |
| action 调用其他 store 的 action | 列入依赖节 |

## 常见错误

| 错误 | 正确做法 |
|------|----------|
| 文档化了未 return 的内部 ref/reactive | 只文档化 return 中暴露的内容 |
| 把 helpers/utils 函数当作 Actions | 只文档化 store 定义内的函数 |
| 把 Pinia 的 `$reset` 等内置方法文档化 | 只文档化用户定义的内容 |
| 把 Vuex 的 `state()` 返回值当普通对象 | 识别为 State 定义 |
| 依赖节漏掉间接引用 | 分析 action 体内的 dispatch/useStore 调用 |
| 混淆 Pinia 和 Vuex 模板 | 先检测类型再选模板 |
| 每个文件生成一个 .md | 单文件多 store 生成一个 .md，用二级标题分隔 |
