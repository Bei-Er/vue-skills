---
name: vue-skills:check-code
description: 当需要审查 Vue 前端项目代码（.vue、.js、.ts 文件）中的明显错误和明显可优化的地方时使用。支持 Vue 3 Composition API 和 Vue 2 选项式。
---

# Vue 项目代码检查

## 概述

对 .vue、.js、.ts 文件逐项扫描，发现正确性错误和优化点。支持 Vue 3（Composition API）和 Vue 2（选项式），根据代码写法自动选用对应检查项。

## 适用场景

- 审查现有代码的质量
- 新功能开发完成后做自检
- 代码评审时作为检查清单

不适用于：架构设计审查、TypeScript 类型系统层面的深度审查。

## 检查范围

在开始执行前，询问用户检查范围：

- **全部扫描** — 扫描项目中所有 `.vue`、`.js`、`.ts` 文件
- **局部扫描** — 用户指定具体文件或目录，只检查指定的部分

若用户提供了接口文档或后端项目目录，额外启用 **接口对接检查**（见分类 10）。

## 检查清单

按以下分类逐项检查。标注适用范围的条目仅在匹配时检查。

### 1. 响应性（组件 + store）

**Vue 3（Composition API）：**

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| reactive 用于基本类型 | `reactive(0)` / `reactive(false)` | 使用 `ref` |
| 解构 reactive 丢失响应性 | `const { x } = reactive({...})` | `toRefs` 或直接访问 `state.x` |
| watch 监听 reactive 属性值 | `watch(state.count, cb)` | `watch(() => state.count, cb)` |
| ref 嵌套 reactive | `ref(reactive({...}))` | 只用 `ref` 或只用 `reactive` |
| computed 返回新引用 | `computed(() => { return { ...obj } })` 每次返回新对象 | 内部缓存或使用 `shallowRef` 手动控制 |
| key 使用 index | `:key="index"` | 使用唯一且稳定的标识（如 `id`） |

**Vue 2（选项式）：**

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| 数组索引直接赋值 | `this.list[0] = newVal` | `this.$set(this.list, 0, newVal)` 或 `splice` |
| 动态添加对象属性 | `this.obj.newProp = val` | `this.$set(this.obj, 'newProp', val)` |
| data 不是函数 | `data: { ... }`（对象） | `data() { return { ... } }` |
| 箭头函数丢失 this | `watch: { data: (val) => { this.xxx } }` | 使用普通函数保留 `this` |

**通用：**

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| 直接修改 props | `props.xxx = newVal` / `this.xxx = newVal` | 通过 `emit` 通知父组件修改 |

### 2. 异步与并发（所有文件）

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| 竞态条件 | 搜索输入连续触发请求，旧请求后返回覆盖新结果 | 用请求序号或 `AbortController` 取消前一次请求 |
| 组件卸载后更新状态 | 异步回调中修改已卸载组件的 state | 在清理阶段标记取消，回调中检查是否已卸载 |
| 异步函数缺少错误处理 | `async function fn() { await api() }` 无 try/catch | 捕获异常并合理处理或向上抛出 |
| Promise 未处理 | `someAsyncFn()` 未 await 也未 .catch | 使用 `await` 或 `.catch()` 处理 |
| 定时器泄漏 | `setInterval/setTimeout` 未清理 | Vue 3：`onUnmounted` 清理；Vue 2：`beforeDestroy` 清理 |
| 事件监听泄漏 | `addEventListener` 无对应 `removeEventListener` | 在对应生命周期钩子中移除 |

### 3. 模板（组件）

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| v-if + v-for 同元素 | `<div v-for="x in list" v-if="x.active">` | 用 `computed` 过滤，或将 `v-if` 移到内层元素 |
| v-for 缺少 key | `<div v-for="x in list">` | 添加 `:key="x.id"` |
| 内联函数/对象 | `@click="() => fn()"` / `:style="{ color: 'red' }"` | 提取为方法或 `computed` |
| v-model 绑定 computed 无 setter | `<Comp v-model="computedVal" />` 但 computed 只读 | 添加 setter，或改用 `:value` + `@input` |
| nextTick 缺失 | 数据变更后立即操作 DOM | 在 `nextTick` 回调中操作 DOM |

### 4. 计算与监听（组件 + store）

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| computed 含副作用 | computed 中执行异步操作或修改外部状态 | computed 只做纯计算，副作用放 `watch` |
| 应为 computed 的方法 | Vue 3：`function getCount() { return list.value.length }`；Vue 2：`methods: { getCount() {} }` | 使用 `computed` 获得缓存 |
| 不必要的响应式 | Vue 3：`const API = ref('...')`；Vue 2：`data` 中声明不变的常量 | 不变常量使用普通 `const` 或移出 `data` |
| watch deep 误用 | Vue 3 对 `reactive` 对象默认深层监听，不需要 `deep: true`；Vue 2 对大对象盲目加 `deep: true` | 只在确实需要时使用 `deep`，优先监听具体属性 |

### 5. 路由（router 文件）

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| 守卫未正确处理 | Vue 2：未调用 `next()`；Vue 3：守卫未返回值 | 确保所有分支都有明确的导航决策 |
| 路由跳转未捕获错误 | `router.push(...)` 未处理 `NavigationDuplicated` | 使用 `.catch(() => {})` 或 `try/catch` |
| 缺少路由懒加载 | `component: UserList`（直接导入） | `component: () => import('./UserList.vue')` |

### 6. 状态管理（store 文件）

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| Vuex mutations 外修改 state | 直接赋值 `state.xxx = val`（非 mutation 中） | 通过 `commit` 调用 mutation |
| Vuex mutation 中异步操作 | `mutations: { setData() { fetch(...).then(...) } }` | 异步操作放 `actions`，`commit` mutation 更新 state |
| store 间循环依赖 | store A 导入 store B，store B 又导入 store A | 提取共享逻辑到独立模块，或通过参数传递 |

### 7. 工具方法（utils 文件）

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| 工具函数有副作用 | `function format(str) { document.title = str; return ... }` | 纯函数不应修改外部状态 |
| 闭包引用陈旧变量 | 事件回调或定时器中引用的变量已过期 | 使用 `ref`（Vue 3）或在回调中重新获取最新值 |
| 默认参数可简化 | `if (x === undefined) x = 0` | 使用函数默认参数 `function fn(x = 0)` |

### 8. 性能（组件 + store）

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| 大对象深度响应 | `ref(largeObject)` | 使用 `shallowRef`，仅在需要时 `triggerRef` 手动触发 |
| 大数组深度响应 | `reactive(largeArray)` | 使用 `shallowReactive` 或 `shallowRef` |

### 9. 过度复杂（所有文件）

发现明显可简化的代码时，提供简化方案。复杂逻辑无法简化时，建议补充注释。

| 检查项 | 复杂模式 | 简化方向 |
|--------|----------|----------|
| 嵌套过深 | 超过 3 层的 if/else、回调或三元嵌套 | 提前 `return`、`async/await`、提取函数或 `Map` 映射 |
| 冗长条件判断 | `a === 'x' \|\| a === 'y' \|\| a === 'z'` | `['x','y','z'].includes(a)` 或 `Set` |
| 函数职责过多 | 一个函数混合了数据获取、转换、UI 操作等不相关逻辑 | 拆分为独立函数，每个只做一件事 |
| 重复代码块 | 相同或高度相似的代码出现 2 次以上 | 提取为公共函数、组件或 composable |

**规则：** 只报告明显可简化的代码，不重构设计合理的复杂逻辑。

### 10. 注释缺失（所有文件）

对复杂度高但无注释的代码，建议补充注释。不要求简单代码加注释。

| 检查项 | 触发条件 | 建议 |
|--------|----------|------|
| 复杂函数缺少注释 | 函数体超过 20 行，无 JSDoc 也无行内注释 | 建议添加函数头注释，说明用途和关键逻辑 |
| 复杂条件缺少注释 | 多层嵌套的条件判断，无注释说明分支含义 | 建议在关键分支添加简短注释 |
| 算法或业务规则无注释 | 包含非直观的计算、转换或业务规则 | 建议注释说明"为什么"，而非"做什么" |

**不报告的场景：** 代码本身简洁自明、命名清晰、常规 CRUD 操作。

### 11. 接口对接（前端 API 调用 vs 接口文档/后端代码）

仅在用户提供了接口文档（Swagger、OpenAPI、Markdown 等）或后端项目目录时启用。

将前端代码中所有接口调用与文档/后端定义逐一比对：

| 检查项 | 错误模式 | 正确做法 |
|--------|----------|----------|
| 请求路径不匹配 | 前端 `/api/user/list`，后端 `/api/users` | 与接口文档中的路径保持一致 |
| 请求方法错误 | 接口要求 `POST`，前端用了 `GET` | 按文档定义使用正确的 HTTP 方法 |
| 请求参数缺失或多余 | 前端未传必填参数，或传了后端不接收的参数 | 严格按接口文档传递参数 |
| 参数类型不匹配 | 接口要求 `number`，前端传了 `string` | 确保参数类型与文档定义一致 |
| 返回值字段名错误 | 前端读取 `res.data.userName`，实际返回 `res.data.username` | 字段名与接口返回结构严格对应 |
| 返回值字段缺失 | 前端使用了接口文档中不存在的字段 | 只使用文档中定义的返回字段 |

## 输出格式

对每个发现的问题，给出：

- **严重程度：** 错误 / 性能 / 建议
- **问题描述：** 一句话
- **所在位置：** 文件名 + 行号
- **修改建议：** 正确做法

按严重程度排序：错误 → 性能 → 建议。

## 检查原则

- 仅检查列出的清单项，不做架构层面或设计模式的评价
- 不修改代码，只报告发现
- 不确定的项标注为"建议"而非"错误"