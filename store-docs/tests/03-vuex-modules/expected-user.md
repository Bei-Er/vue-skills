# 用户模块(0)

用户模块

**命名空间：** `user/`

---

## State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | `string` | `''` | 用户名 |
| email | `string` | `''` | 用户邮箱 |
| isLoggedIn | `boolean` | `false` | 是否已登录 |

**示例：**

```js
const name = store.state.user.name
```

## Getters

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| displayName | — | `string` | 用户显示名称 |
| profile | — | `string` | 用户信息摘要 |

**示例：**

```js
const name = store.getters['user/displayName']
```

## Actions

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| login | `(credentials: Object)` | `Promise` | 用户登录 |
| logout | — | `void` | 退出登录 |

**示例：**

```js
await store.dispatch('user/login', { username: 'admin', password: '123456' })
```

## Mutations

| 名称 | 载荷类型 | 说明 |
|------|----------|------|
| SET_NAME | `string` | 设置用户名 |
| SET_LOGGED_IN | `boolean` | 设置登录状态 |

**示例：**

```js
store.commit('user/SET_NAME', '新用户名')
```
