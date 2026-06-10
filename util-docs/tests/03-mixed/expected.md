# 数据验证

---

## index

### flatten

**说明：** 将嵌套数组拍平为一维数组

```js
function flatten(arr)
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| arr | `(T \| T[])[]` | 是 | - | 嵌套数组 |

**返回值：** `T[]` — 拍平后的一维数组

**示例：**

```js
import { flatten } from '@/utils/array'

flatten([1, [2, 3], [4, [5]]])
// => [1, 2, 3, 4, [5]]
```

### filterBy

**说明：** 根据条件过滤数组并返回匹配的元素

```js
function filterBy(list, predicate)
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| list | `T[]` | 是 | - | 源数组 |
| predicate | `(item: T) => boolean` | 是 | - | 过滤条件 |

**返回值：** `T[]` — 过滤后的新数组

**示例：**

```js
import { filterBy } from '@/utils/array'

filterBy([1, 2, 3, 4], (n) => n > 2)
// => [3, 4]
```

### unique

**说明：** 数组去重

```js
function unique(arr)
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| arr | `T[]` | 是 | - | 源数组 |

**返回值：** `T[]` — 去重后的数组

**示例：**

```js
import { unique } from '@/utils/array'

unique([1, 2, 2, 3, 3])
// => [1, 2, 3]
```

---

## helpers

### chunk

**说明：** 将数组按指定大小分块

```js
function chunk(arr, size)
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| arr | `T[]` | 是 | - | 源数组 |
| size | `number` | 是 | - | 每块大小 |

**返回值：** `T[][]` — 分块后的二维数组

**示例：**

```js
import { chunk } from '@/utils/array/helpers'

chunk([1, 2, 3, 4, 5], 2)
// => [[1, 2], [3, 4], [5]]
```

---
