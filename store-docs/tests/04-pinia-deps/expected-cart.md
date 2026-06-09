# 购物车(0)

购物车状态管理

---

## State

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `CartItem[]` | `[]` | 购物车商品列表 |

**示例：**

```js
const store = useCartStore()
console.log(store.items) // => []
```

## Getters

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| totalPrice | — | `number` | 购物车总价 |
| totalCount | — | `number` | 商品数量 |

**示例：**

```js
const store = useCartStore()
console.log(store.totalPrice) // => 0
```

## Actions

| 名称 | 参数 | 返回类型 | 说明 |
|------|------|----------|------|
| addItem | `(item: Object)` | `Promise<void>` | 添加商品到购物车 |
| clearCart | — | `void` | 清空购物车 |
| checkout | — | `Promise<void>` | 结算 |

**示例：**

```js
const store = useCartStore()
await store.addItem({ id: 1, name: '商品', price: 99, quantity: 2 })
```

---

## 依赖

- `useAuthStore` — 检查登录状态、获取认证头信息
