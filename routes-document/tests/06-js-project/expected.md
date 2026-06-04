# 路由文档

## 路由总览

```
├── /       Home
├── /about  About
└── /login  Login
```

---

## Home

**路径：** `/`

```js
{
  path: '/',
  name: 'Home',
  component: Home
}
```

---

## About

**路径：** `/about`

```js
{
  path: '/about',
  name: 'About',
  component: About
}
```

---

## Login

**路径：** `/login`

```js
{
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login.vue'),
  beforeEnter (to, from, next) {
    if (localStorage.getItem('token')) {
      next({ name: 'Home' })
    } else {
      next()
    }
  }
}
```

**Props：**

- `redirect?: string` — 登录后跳转地址

---
