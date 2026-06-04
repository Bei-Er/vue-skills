# format

---

## toChineseDate

**说明：** 将日期格式化为中文格式

```ts
function toChineseDate(date: Date): string
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| date | `Date` | 是 | - | 目标日期 |

**返回值：** `string` — 中文格式的日期字符串

**示例：**

```ts
import { toChineseDate } from '@/utils/date/format'

toChineseDate(new Date(2024, 0, 15))
// => '2024年1月15日'
```

---

## isToday

**说明：** 判断是否为今天

```ts
function isToday(date: Date): boolean
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| date | `Date` | 是 | - | 目标日期 |

**返回值：** `boolean` — 是否为今天

**示例：**

```ts
import { isToday } from '@/utils/date/format'

isToday(new Date())
// => true
```

---
