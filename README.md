# vue-skills

AI Agent 技能集合，用于 Vue 项目的文档生成和代码检查。

## 项目地址

https://github.com/Bei-Er/vue-skills

## 使用

### `/vue-skills:init-docsify`

初始化 docsify 文档站点。生成 `docs/` 目录、`index.html`、`_sidebar.md` 和四个空分类目录。

仅首次使用时调用一次。

### `/vue-skills:generate-docs`

一键生成全部文档。依次调用 component-docs、router-docs、store-docs、utils-docs，全部完成后自动更新侧边栏。

支持全部生成或按用户指定的局部生成。项目缺少某个目录时自动跳过。

### `/vue-skills:check-code`

审查 .vue、.js、.ts 代码中的明显错误和优化点。支持 Vue 3 Composition API 和 Vue 2 选项式。

检查覆盖：响应性、异步并发、模板、计算与监听、路由、状态管理、工具方法、性能、复杂度。若提供了接口文档或后端项目目录，还会检查前后端接口对接是否一致。

支持全部扫描或按用户指定的文件/目录局部扫描。

## 典型工作流

```
1. /vue-skills:init-docsify       ← 初始化文档站点（仅首次）
2. /vue-skills:generate-docs      ← 生成全部文档并更新侧边栏
3. /vue-skills:check-code         ← 审查代码质量
```

后续项目更新后，重新执行 `generate-docs` 即可同步文档。
