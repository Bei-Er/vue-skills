# 期望发现的问题

## 路由（router.ts）

| # | 问题 | 分类 | 位置 |
|---|------|------|------|
| 1 | `Home` 和 `About` 直接导入，缺少路由懒加载 | 路由 | 第 2-3 行 |
| 2 | `beforeEach` 守卫中 `/admin` 分支返回了重定向，但其他分支未返回值 | 路由 | 第 15 行 |
| 3 | `router.push(...)` 未捕获可能的 `NavigationDuplicated` 错误 | 路由 | 第 23 行 |

## 状态管理（store.ts）

| # | 问题 | 分类 | 位置 |
|---|------|------|------|
| 1 | `fetchUser` 是 mutation 但内含 `await fetch`，异步操作应在 action 中 | 状态管理 | 第 10 行 |
| 2 | `login` action 中直接 `state.token = payload.token`，应通过 `commit` mutation 修改 | 状态管理 | 第 19 行 |

## 工具方法（utils.ts）

| # | 问题 | 分类 | 位置 |
|---|------|------|------|
| 1 | `formatDate` 中修改了 `document.title`，纯函数不应有副作用 | 工具方法 | 第 3 行 |
| 3 | `greeting === undefined` 判断可用函数默认参数简化 | 工具方法 | 第 27 行 |
