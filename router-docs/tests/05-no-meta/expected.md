# 路由文档

## 路由总览

```
├── /          Dashboard
├── /profile   UserProfile
└── /settings  Settings
```

---

## Dashboard

**路径：** `/`

```js
{
  path: '/',
  name: 'Dashboard',
  component: Dashboard
}
```

---

## UserProfile

**路径：** `/profile`

```js
{
  path: '/profile',
  name: 'UserProfile',
  component: Profile
}
```

**Props：**

- `userId?: number` — 用户 ID

---

## Settings

**路径：** `/settings`

```js
{
  path: '/settings',
  name: 'Settings',
  component: () => import('@/views/Settings.vue')
}
```

---
