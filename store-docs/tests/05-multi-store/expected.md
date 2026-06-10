# 应用状态

---

## useAppStore — 应用状态

应用全局状态

### State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| sidebarCollapsed | `boolean` | `false` | 侧边栏是否折叠 |
| pageTitle | `string` | `'首页'` | 页面标题 |

**示例：**

```js
const store = useAppStore()
console.log(store.sidebarCollapsed) // => false
```

### Actions

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| toggleSidebar | — | `void` | 切换侧边栏 |

**示例：**

```js
const store = useAppStore()
store.toggleSidebar()
```

---

## useNotificationStore — 通知状态

通知状态

### State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| unreadCount | `number` | `0` | 未读数量 |

**示例：**

```js
const store = useNotificationStore()
console.log(store.unreadCount) // => 0
```

### Getters

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| hasUnread | — | `boolean` | 是否有未读通知 |

**示例：**

```js
const store = useNotificationStore()
console.log(store.hasUnread) // => false
```
