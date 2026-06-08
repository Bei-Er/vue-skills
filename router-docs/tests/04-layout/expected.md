# 路由文档

## 路由总览

```
├── /                首页
├── /products        产品列表
├── /products/:id    产品详情
├── /auth
│   ├── /login       登录
└── /register        注册
```

**全局守卫：** `beforeEach` — 登录状态检查

---

## 首页

**路径：** `/`

```js
{
  path: '',
  name: 'Home',
  component: () => import('@/views/Home.vue'),
  meta: { title: '首页' }
}
```

---

## 产品列表

**路径：** `/products`

```js
{
  path: 'products',
  name: 'Products',
  component: () => import('@/views/Products.vue'),
  meta: { title: '产品列表' }
}
```

---

## 产品详情

**路径：** `/products/:id`

```js
{
  path: 'products/:id',
  name: 'ProductDetail',
  component: () => import('@/views/ProductDetail.vue'),
  meta: { title: '产品详情' }
}
```

---

## 登录

**路径：** `/auth/login`

```js
{
  path: 'login',
  name: 'Login',
  component: () => import('@/views/auth/Login.vue'),
  meta: { title: '登录', guest: true }
}
```

**Props：**

- `redirect?: string` — 登录后跳转地址

---

## 注册

**路径：** `/auth/register`

```js
{
  path: 'register',
  name: 'Register',
  component: () => import('@/views/auth/Register.vue'),
  meta: { title: '注册', guest: true }
}
```

---
