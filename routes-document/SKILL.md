---
name: routes-document
description: 当需要为 Vue 项目的 vue-router 路由配置生成 README.md 文档时使用。扫描路由配置，生成简洁的路径-配置对照文档。
---

# 路由文档生成

## 概述

扫描 Vue 项目的路由配置，在 router 目录下生成 README.md。每条路由显示完整路径、配置代码、组件 props。

## 适用场景

- 为 Vue 项目的路由配置生成/更新文档
- 新增了路由模块，需要同步更新路由文档

## 核心流程

### 第 1 步：定位路由配置

按以下优先级查找：

1. `src/router/index.ts`（或 .js）
2. `src/router.ts`
3. `src/routes/index.ts`
4. 用户指定的路径

### 第 2 步：扫描路由配置

识别路由定义模式：

**模式 A：单文件数组**

```js
const routes = [
  { path: '/', component: Home }
]
```

**模式 B：模块拆分**

```js
import userRoutes from './modules/user'
const routes = [...userRoutes]
```

### 第 3 步：读取组件 props

对每条路由的 component，找到对应的组件文件，提取 props 定义：

- `defineProps<{ ... }>()` — TypeScript 泛型语法
- `defineProps({ ... })` — 选项式语法
- `props: { ... }` — 选项式组件

### 第 4 步：生成 README.md

输出到 `src/router/README.md`。

## README 模板

````markdown
# 路由文档

## 路由总览

```
├── /              首页
├── /user
│   ├── /          用户列表
│   ├── /:id       用户详情
│   └── /settings  用户设置
└── /about         关于我们
```

---

## 用户详情

**路径：** `/detail/:id`

```js
{
  name: 'detail',
  path: '/detail/:id',
  component: Detail,
  meta: {}
}
```

**Props：**

- `id: string` — 用户 ID
- `title?: string` — 页面标题

---

## 关于我们

**路径：** `/about`

```js
{
  name: 'about',
  path: '/about',
  component: About,
  meta: { title: '关于我们' }
}
```

---
````

### 模板规则

**路由总览：**
- 缩进表示父子关系，显示路径和推断的中文名称
- `path: '/'` 的布局路由，其子路由显示在顶层，不缩进
- 重定向路由显示 `→ /target`，不出现在路由详情中

**路由详情：**
- 标题优先从 `meta.title`、`name`、组件名推断中文名称；推断失败时使用完整解析路径
- 路径写在 `**路径：**` 行，紧跟标题下方
- 代码块保留源文件中的原始配置
- 组件有 props 时显示 `**Props：**` 列表，每项包含名称、类型、说明（从 JSDoc 或命名推断）
- 无 props 或找不到组件文件则省略 Props 部分
- `---` 分隔每条路由
- 只文档化有 `name` 的路由，跳过无名称的布局路由和纯重定向路由
- 全局守卫（`beforeEach` 等）在路由总览后单独列出

## 边界情况处理

| 场景 | 处理方式 |
|------|----------|
| 懒加载 `() => import(...)` | 保留原始写法，解析路径查找组件文件 |
| 组件文件不存在 | 路由正常文档化，省略 Props |
| 全局守卫 | 文档开头单独列出 |
| 404 / 通配符路由 | 正常文档化 |

## 常见错误

| 错误 | 正确做法 |
|------|----------|
| 重写路由配置为"规范格式" | 保留源文件原始写法 |
| 组件找不到就跳过路由 | 路由正常文档化，只省略 Props |
| 全局守卫重复到每条路由 | 全局守卫单独列在文档头部 |
