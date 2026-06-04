# auth

认证状态管理

---

## State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| token | `string` | `''` | 认证 token |
| isAuthenticated | `boolean` | `false` | 是否已认证 |

## Getters

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| authHeader | — | `{ Authorization: string }` | 认证头信息 |

## Actions

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| login | `(username: string, password: string)` | `Promise<void>` | 登录 |
| logout | — | `void` | 退出登录 |
