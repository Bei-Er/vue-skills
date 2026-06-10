# 主题管理

主题状态管理

---

## State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| mode | `string` | `'light'` | 当前主题 |
| primaryColor | `string` | `'#409eff'` | 主色调 |
| followSystem | `boolean` | `true` | 是否跟随系统 |

**示例：**

```js
const store = useThemeStore()
console.log(store.mode) // => 'light'
```

## Getters

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| isDark | — | `boolean` | 是否为暗色主题 |

**示例：**

```js
const store = useThemeStore()
console.log(store.isDark) // => false
```

## Actions

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| setMode | `(mode: string)` | `void` | 切换主题 |
| setPrimaryColor | `(color: string)` | `void` | 设置主色调 |

**示例：**

```js
const store = useThemeStore()
store.setMode('dark')
```
