# user

用户状态管理

---

## State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| userInfo | `UserInfo \| null` | `null` | 当前用户信息 |
| token | `string` | `''` | 登录 token |
| isLoggedIn | `boolean` | `false` | 是否已登录 |

## Getters

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| displayName | — | `string` | 用户显示名称 |
| isVip | — | `boolean` | 是否为 VIP 用户 |

## Actions

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| login | `(username: string, password: string)` | `Promise<void>` | 登录 |
| logout | — | `void` | 退出登录 |
| updateUserInfo | `(info: Partial<UserInfo>)` | `void` | 更新用户信息 |
