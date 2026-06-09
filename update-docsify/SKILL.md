---
name: vue-skills:update-docsify
description: 当 vue-skills:component-docs、vue-skills:directive-docs、vue-skills:store-docs、vue-skills:util-docs 生成文档后，需要更新 docs/_sidebar.md 以包含实际文档链接时使用。扫描 docs/ 子目录中的 .md 文件，生成带子链接的侧边栏。
---

# 更新 Docsify 侧边栏

## 概述

扫描 `docs/` 下四个子目录（components、directives、stores、utils）中已生成的 `.md` 文件，重新生成 `docs/_sidebar.md`。路由为固定链接，不参与扫描。

## 适用场景

- 文档 skill 执行完毕后，需要将生成的文档绑定到侧边栏
- 新增或删除了文档文件，需要同步更新侧边栏

## 核心流程

### 第 1 步：扫描 docs/ 目录

按固定顺序扫描四个子目录，收集每个目录下的 `.md` 文件：

| 目录 | 分类名 |
|------|--------|
| `docs/components/` | 组件 |
| `docs/directives/` | 自定义指令 |
| `docs/stores/` | Store |
| `docs/utils/` | 工具方法 |

**规则：**
- 只收集直接子级的 `.md` 文件，不递归子目录
- 按文件名字母排序
- 目录不存在或为空时，分类只显示标题

### 第 2 步：生成链接

对每个 `.md` 文件生成侧边栏子链接：

| 规则 | 说明 |
|------|------|
| 显示名 | 读取 .md 文件的第一个 `#` 标题，保留引用次数 |
| 链接路径 | 相对于 `docs/` 的路径 |
| 缩进 | 2 空格 |

### 第 3 步：写入 _sidebar.md

生成完整内容并写入 `docs/_sidebar.md`：

````markdown
- [首页](/README.md)
- [路由](routes/)

- 组件
  - [按钮组件(3)](components/Button.md)
  - [对话框(2)](components/Dialog.md)
- 自定义指令
  - [自动聚焦(1)](directives/focus.md)
  - [权限控制(4)](directives/permission.md)
- Store
  - [用户管理(5)](stores/user.md)
  - [购物车(2)](stores/cart.md)
- 工具方法
  - [格式化工具(6)](utils/format.md)
  - [验证工具(3)](utils/validate.md)
````

**格式规则：**
- 前两行固定为首页和路由链接
- 路由链接后空一行
- 四个分类按固定顺序排列，分类之间不空行
- 空分类只写 `- 分类名`，无子链接
- 显示名为对应 .md 文件中的第一个 `#` 标题内容（含引用次数）
- 直接覆盖写入，不合并旧内容

## 边界情况处理

| 场景 | 处理方式 |
|------|----------|
| 某个分类目录不存在 | 该分类只显示标题 |
| 分类目录为空 | 该分类只显示标题 |
| `_sidebar.md` 不存在 | 直接创建 |
| `_sidebar.md` 已存在 | 覆盖写入 |

## 常见错误

| 错误 | 正确做法 |
|------|----------|
| 路由作为可展开分类 | 路由是固定链接 `- [路由](routes/)` |
| 子链接使用 4 空格或 Tab 缩进 | 固定 2 空格缩进 |
| 分类之间添加空行 | 分类之间不空行 |
| 递归扫描子目录 | 只收集直接子级 `.md` 文件 |
