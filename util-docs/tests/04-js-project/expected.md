# 样式工具

---

## getCookie

**说明：** 获取 Cookie 值

```js
function getCookie(name)
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| name | `string` | 是 | - | Cookie 名称 |

**返回值：** `string | null` — Cookie 值，不存在时返回 null

**示例：**

```js
import { getCookie } from '@/utils/cookie'

getCookie('token')
// => 'abc123'
```

---

## setCookie

**说明：** 设置 Cookie 值，可指定过期天数

```js
function setCookie(name, value, days)
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| name | `string` | 是 | - | Cookie 名称 |
| value | `string` | 是 | - | Cookie 值 |
| days | `number` | 否 | `7` | 过期天数 |

**返回值：** `void`

**示例：**

```js
import { setCookie } from '@/utils/cookie'

setCookie('token', 'abc123', 30)
```

---

## removeCookie

**说明：** 删除指定 Cookie

```js
function removeCookie(name)
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| name | `string` | 是 | - | Cookie 名称 |

**返回值：** `void`

**示例：**

```js
import { removeCookie } from '@/utils/cookie'

removeCookie('token')
```

---
