# 路由文档

## 路由总览

```
├── /                首页
├── /home → /
├── /user/:id        用户详情
├── /search          搜索
└── /article/:slug   文章详情
```

---

## 首页

**路径：** `/`

```js
{
  path: '/',
  name: 'Home',
  component: () => import('@/views/Home.vue')
}
```

---

## 用户详情

**路径：** `/user/:id`

```js
{
  path: '/user/:id',
  name: 'UserDetail',
  component: () => import('@/views/user/Detail.vue'),
  props: true
}
```

**Props：**

- `id: string` — 用户 ID

---

## 搜索

**路径：** `/search`

```js
{
  path: '/search',
  name: 'Search',
  component: () => import('@/views/Search.vue'),
  props: { highlight: true }
}
```

---

## 文章详情

**路径：** `/article/:slug`

```js
{
  path: '/article/:slug',
  name: 'Article',
  component: () => import('@/views/Article.vue'),
  props: (route) => ({ slug: route.params.slug, page: Number(route.query.page) || 1 })
}
```

---
