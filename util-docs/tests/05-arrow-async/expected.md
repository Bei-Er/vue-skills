# 请求工具(0)

---

## fetchWithTimeout

**说明：** 带超时的 fetch 请求

```js
async function fetchWithTimeout(url, options, timeout = 10000)
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| url | `string` | 是 | - | 请求地址 |
| options | `RequestInit` | 否 | - | 请求配置 |
| timeout | `number` | 否 | `10000` | 超时时间（毫秒） |

**返回值：** `Promise<Response>` — 响应数据

**示例：**

```js
import { fetchWithTimeout } from '@/utils/request'

const data = await fetchWithTimeout('/api/user', { method: 'GET' }, 5000)
```

---

## parseJSON

**说明：** 解析响应为 JSON

```js
const parseJSON = async (response) => {}
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| response | `Response` | 是 | - | fetch 响应对象 |

**返回值：** `Promise<T>` — 解析后的 JSON 数据

**示例：**

```js
import { parseJSON } from '@/utils/request'

const res = await fetchWithTimeout('/api/user')
const data = await parseJSON<User>(res)
```

---

## retry

**说明：** 重试请求

```js
async function retry(fn, retries = 3, delay = 1000)
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| fn | `() => Promise<T>` | 是 | - | 要重试的异步函数 |
| retries | `number` | 否 | `3` | 重试次数 |
| delay | `number` | 否 | `1000` | 每次重试间隔（毫秒） |

**返回值：** `Promise<T>` — 函数执行结果

**示例：**

```js
import { retry } from '@/utils/request'

const data = await retry(() => fetchWithTimeout('/api/user'), 3, 1000)
```

---

## throttle

**说明：** 简单的节流函数

```js
const throttle = (fn, wait) => {}
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| fn | `T` | 是 | - | 要节流的函数 |
| wait | `number` | 是 | - | 节流间隔（毫秒） |

**返回值：** 节流后的函数

**示例：**

```js
import { throttle } from '@/utils/request'

const throttledScroll = throttle(() => console.log('scrolling'), 200)
window.addEventListener('scroll', throttledScroll)
```

---
