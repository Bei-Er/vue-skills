# counter

计数器状态管理

---

## State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| count | `number` | `0` | 当前计数 |
| step | `number` | `1` | 步长 |

## Getters

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| doubleCount | — | `number` | 计数的两倍 |
| isPositive | — | `boolean` | 是否为正数 |

## Actions

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| increment | `(n?: number)` | `void` | 增加计数 |
| decrement | — | `void` | 减少计数 |
| reset | `(value?: number)` | `Promise<void>` | 重置计数器 |
