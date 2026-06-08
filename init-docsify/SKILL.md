---
name: vue-skills:init-docsify
description: 当需要为 Vue 项目初始化 docsify 文档站点时使用。生成 docs/ 目录、index.html 和 _sidebar.md，首页链接指向项目根目录的 README.md。
---

# Docsify 文档站点初始化

## 概述

为 Vue 项目创建 docsify 文档站点脚手架。在项目根目录下生成 `docs/` 目录，包含 `index.html`、`_sidebar.md` 和四个空分类目录。

## 适用场景

- Vue 项目需要从零初始化 docsify 文档站点
- 需要重新生成 docsify 脚手架（不覆盖已有文件）

## 核心流程

### 第 1 步：创建目录结构

在项目根目录下创建 `docs/` 目录：

```
docs/
├── index.html
├── _sidebar.md
├── components/
├── routes/
├── stores/
└── utils/
```

如果 `docs/` 目录已存在，跳过已存在的文件，只创建缺失的文件。

### 第 2 步：生成 index.html

````html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{项目名} 文档</title>
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css">
</head>
<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      name: '{项目名}',
      repo: '',
      loadSidebar: true,
      subMaxLevel: 3,
      homepage: '../README.md'
    }
  </script>
  <script src="//cdn.jsdelivr.net/npm/docsify@4/lib/docsify.min.js"></script>
</body>
</html>
````

**规则：**
- `{项目名}` 从 `package.json` 的 `name` 字段获取，读取失败时使用目录名
- `lang="zh-CN"` 固定中文
- `subMaxLevel: 3` 允许侧边栏显示到三级标题

### 第 3 步：生成 _sidebar.md

````markdown
- [首页](../README.md)
- [路由](routes/)

- 组件
- Store
- 工具方法
````

**规则：**
- 首页和路由为链接，首页指向项目根目录的 README.md，路由指向 `routes/` 目录（docsify 自动加载 `routes/README.md`）
- 三个分类为纯文本标题（非链接），由各自的 `vue-skills:*-docs` skill 在该目录下生成子页面后自动展开
- 顺序固定：首页 → 路由 → 组件 → Store → 工具方法

## 边界情况处理

| 场景 | 处理方式 |
|------|----------|
| `docs/` 目录已存在 | 跳过已存在的文件，只创建缺失文件 |
| 项目没有 `package.json` | 项目名使用目录名 |

## 常见错误

| 错误 | 正确做法 |
|------|----------|
| 覆盖已存在的文件 | 跳过已存在的文件 |
| 使用英文模板 | 固定中文模板 |
| `index.html` 使用本地 docsify 文件 | 使用 CDN 引入 |
