# store

全局状态管理

---

## State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| loading | `boolean` | `false` | 全局加载状态 |
| message | `string` | `''` | 全局提示消息 |
| theme | `string` | `'light'` | 主题设置 |

## Getters

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| isLoading | — | `boolean` | 是否正在加载 |
| currentTheme | — | `string` | 当前主题 |

## Actions

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| showMessage | `(payload: { msg: string, duration?: number })` | `void` | 显示提示消息 |

## Mutations

| 名称 | 载荷类型 | 说明 |
|------|----------|------|
| SET_LOADING | `boolean` | 设置加载状态 |
| SET_MESSAGE | `string` | 设置提示消息 |
| TOGGLE_THEME | — | 切换主题 |
