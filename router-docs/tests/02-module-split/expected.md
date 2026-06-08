# 路由文档

## 路由总览

```
├── /                     首页
├── /user
│   ├── /               用户列表
│   ├── /:id            用户详情
│   ├── /:id/settings   用户设置
│   └── /:id/posts      用户帖子
├── /admin → /admin/dashboard
│   ├── /dashboard      管理面板
│   └── /users          用户管理
└── /:pathMatch(.*)*      页面不存在
```

**全局守卫：** `beforeEach` — 设置页面标题

---

## 首页

**路径：** `/`

```js
{
  path: '/',
  name: 'Home',
  component: Home,
  meta: { title: '首页' }
}
```

---

## 用户列表

**路径：** `/user`

```js
{
  path: '',
  name: 'UserList',
  component: () => import('@/views/user/List.vue'),
  meta: { title: '用户列表' }
}
```

---

## 用户详情

**路径：** `/user/:id`

```js
{
  path: ':id',
  name: 'UserDetail',
  component: () => import('@/views/user/Detail.vue'),
  meta: { title: '用户详情', requiresAuth: true },
  beforeEnter: (to, from, next) => {
    if (!/^\d+$/.test(to.params.id as string)) {
      return next({ name: 'NotFound' })
    }
    next()
  }
}
```

**Props：**

- `id: string` — 用户 ID
- `title?: string` — 页面标题

---

## 用户设置

**路径：** `/user/:id/settings`

```js
{
  path: ':id/settings',
  name: 'UserSettings',
  component: () => import('@/views/user/Settings.vue'),
  meta: { title: '用户设置', requiresAuth: true },
  alias: '/profile'
}
```

**Props：**

- `id: string` — 用户 ID
- `theme?: string` — 主题风格

---

## 用户帖子

**路径：** `/user/:id/posts`

```js
{
  path: ':id/posts',
  name: 'UserPosts',
  component: () => import('@/views/user/Posts.vue'),
  meta: { title: '用户帖子' }
}
```

---

## 管理面板

**路径：** `/admin/dashboard`

```js
{
  path: 'dashboard',
  name: 'AdminDashboard',
  component: () => import('@/views/admin/Dashboard.vue'),
  meta: { title: '管理面板' }
}
```

---

## 用户管理

**路径：** `/admin/users`

```js
{
  path: 'users',
  name: 'AdminUsers',
  component: () => import('@/views/admin/Users.vue'),
  meta: { title: '用户管理' }
}
```

---

## 页面不存在

**路径：** `/:pathMatch(.*)*`

```js
{
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFound,
  meta: { title: '页面不存在' }
}
```

---
