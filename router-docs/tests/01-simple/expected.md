# 路由文档

## 路由总览

```
├── /           首页
├── /about      关于我们
└── /contact    联系方式
```

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

## 关于我们

**路径：** `/about`

```js
{
  path: '/about',
  name: 'About',
  component: About,
  meta: { title: '关于我们' }
}
```

---

## 联系方式

**路径：** `/contact`

```js
{
  path: '/contact',
  name: 'Contact',
  component: Contact,
  meta: { title: '联系方式' }
}
```

---
