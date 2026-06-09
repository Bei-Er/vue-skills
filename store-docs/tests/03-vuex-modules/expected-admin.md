# 管理模块(0)

管理模块

**命名空间：** `admin/`

---

## State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| onlineCount | `number` | `0` | 在线用户数 |
| config | `Object` | `{}` | 系统配置 |

**示例：**

```js
const count = store.state.admin.onlineCount
```

## Getters

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| hasOnline | — | `boolean` | 是否有在线用户 |

**示例：**

```js
const hasOnline = store.getters['admin/hasOnline']
```

## Actions

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| fetchOverview | — | `Promise` | 获取系统概览 |

**示例：**

```js
await store.dispatch('admin/fetchOverview')
```

## Mutations

| 名称 | 载荷类型 | 说明 |
|------|----------|------|
| UPDATE_ONLINE | `number` | 更新在线用户数 |
| UPDATE_CONFIG | `Object` | 更新系统配置 |

**示例：**

```js
store.commit('admin/UPDATE_ONLINE', 42)
```

---

## 依赖

- `user` 模块 — 读取用户名（rootState.user.name）
