---
name: vue-skills:generate-docs
description: 当需要为 Vue 项目一次性生成全部文档（组件、路由、Store、自定义指令、工具方法）并更新侧边栏时使用。内部依次调用五个文档 skill，最后统一更新侧边栏。
---

# 整体生成文档

## 概述

一次性调用五个文档 skill 为 Vue 项目生成全部文档，完成后统一更新 docsify 侧边栏。

## 适用场景

- 新项目需要从零生成所有文档
- 项目经历较大改动后需要重新生成文档

## 核心流程

### 第 1 步：确认生成范围

询问用户生成范围：

- **全部生成** — 为所有组件、路由、Store、自定义指令、工具方法生成文档
- **局部生成** — 用户指定要生成的类别和具体内容

### 第 2 步：依次调用文档 skill

根据第 1 步确认的范围，依次调用对应的文档 skill：

1. `vue-skills:component-docs` — 组件文档
2. `vue-skills:router-docs` — 路由文档
3. `vue-skills:store-docs` — Store 文档
4. `vue-skills:directive-docs` — 自定义指令文档
5. `vue-skills:util-docs` — 工具方法文档

**规则：**
- 全部生成时，五个 skill 按顺序全部调用
- 局部生成时，只调用用户指定的 skill，跳过未指定的
- 将第 1 步的范围决定传递给每个 skill，跳过各 skill 自身的范围确认步骤

### 第 3 步：更新侧边栏

所有文档生成完毕后，调用 `vue-skills:update-docsify` 更新侧边栏。

## 边界情况处理

| 场景 | 处理方式 |
|------|----------|
| 项目没有 components 目录 | 跳过 component-docs |
| 项目没有 router 目录 | 跳过 router-docs |
| 项目没有 stores/store 目录 | 跳过 store-docs |
| 项目没有 directives 目录 | 跳过 directive-docs |
| 项目没有 utils 目录 | 跳过 util-docs |
| docs/ 目录不存在 | 先调用 `vue-skills:init-docsify` 初始化 |
