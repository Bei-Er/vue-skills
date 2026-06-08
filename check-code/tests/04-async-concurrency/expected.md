# 期望发现的问题

## 错误

| # | 问题 | 分类 | 位置 |
|---|------|------|------|
| 1 | `search()` 快速连续调用时，旧请求后返回会覆盖新结果，存在竞态条件 | 异步与并发 | 第 11 行 |
| 2 | `loadData()` 异步回调中修改 state，组件卸载后仍会执行 | 异步与并发 | 第 20 行 |
| 3 | `fetch('/api/ping')` 浮动 Promise，未 await 也未 .catch | 异步与并发 | 第 25 行 |
| 4 | `setInterval` 未在 `onUnmounted` 中 `clearInterval`，定时器泄漏 | 异步与并发 | 第 28 行 |
| 5 | `addEventListener('resize', ...)` 未在 `onUnmounted` 中移除 | 异步与并发 | 第 34 行 |
| 6 | `save()` 中 `fetch` 和 `res.json()` 均未 try/catch | 异步与并发 | 第 41 行 |
