# app

---

## useAppStore

应用全局状态

### State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| sidebarCollapsed | `boolean` | `false` | 侧边栏是否折叠 |
| pageTitle | `string` | `'首页'` | 页面标题 |

### Actions

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| toggleSidebar | — | `void` | 切换侧边栏 |

---

## useNotificationStore

通知状态

### State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| unreadCount | `number` | `0` | 未读数量 |

### Getters

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| hasUnread | — | `boolean` | 是否有未读通知 |
