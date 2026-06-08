# format

---

## formatDate

**说明：** 将日期格式化为指定格式的字符串

```js
function formatDate(date, format = 'YYYY-MM-DD')
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| date | `Date` | 是 | - | 要格式化的日期 |
| format | `string` | 否 | `'YYYY-MM-DD'` | 格式模板 |

**返回值：** `string` — 格式化后的日期字符串

**示例：**

```js
import { formatDate } from '@/utils/format'

formatDate(new Date(2024, 0, 15), 'YYYY/MM/DD')
// => '2024/01/15'
```

---

## formatNumber

**说明：** 将数字格式化为千分位分隔的字符串

```js
function formatNumber(value, separator = ',')
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| value | `number` | 是 | - | 要格式化的数字 |
| separator | `string` | 否 | `','` | 千分位分隔符 |

**返回值：** `string` — 带千分位分隔符的字符串

**示例：**

```js
import { formatNumber } from '@/utils/format'

formatNumber(1234567.89)
// => '1,234,567.89'

formatNumber(1234567, ' ')
// => '1 234 567'
```

---

## randomInt

**说明：** 生成指定范围内的随机整数

```js
function randomInt(min, max)
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| min | `number` | 是 | - | 最小值 |
| max | `number` | 是 | - | 最大值 |

**返回值：** `number` — 范围内的随机整数

**示例：**

```js
import { randomInt } from '@/utils/format'

randomInt(1, 100)
// => 42
```

---