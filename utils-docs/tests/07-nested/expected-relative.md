# relative

---

## timeAgo

**说明：** 获取相对时间描述（如"3 分钟前"）

```js
function timeAgo(date)
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| date | `Date` | 是 | - | 目标日期 |

**返回值：** `string` — 相对时间描述字符串

**示例：**

```js
import { timeAgo } from '@/utils/date/relative'

timeAgo(new Date(Date.now() - 60000))
// => '1 分钟前'
```

---
