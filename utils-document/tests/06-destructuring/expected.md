# style

---

## toSize

**说明：** 生成 CSS 尺寸字符串

```ts
function toSize({ width, height, unit }: SizeOptions): string
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| width | `number` | 否 | - | 宽度 |
| height | `number` | 否 | - | 高度 |
| unit | `string` | 否 | `'px'` | 单位 |

**返回值：** `string` — CSS 尺寸字符串

**示例：**

```ts
import { toSize } from '@/utils/style'

toSize({ width: 100, height: 200, unit: 'px' })
// => 'width: 100px; height: 200px;'
```

---

## rgbToHex

**说明：** 将 RGB 值转为十六进制颜色

```ts
function rgbToHex(r: number, g: number, b: number): string
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| r | `number` | 是 | - | 红色值 (0-255) |
| g | `number` | 是 | - | 绿色值 (0-255) |
| b | `number` | 是 | - | 蓝色值 (0-255) |

**返回值：** `string` — 十六进制颜色字符串

**示例：**

```ts
import { rgbToHex } from '@/utils/style'

rgbToHex(255, 128, 0)
// => '#ff8000'
```

---

## addClass

**说明：** 为元素添加 CSS 类名

```ts
const addClass: (el: HTMLElement, ...classNames: string[]) => void
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| el | `HTMLElement` | 是 | - | 目标元素 |
| classNames | `...string[]` | 是 | - | 要添加的类名 |

**返回值：** `void`

**示例：**

```ts
import { addClass } from '@/utils/style'

addClass(document.body, 'dark', 'no-scroll')
```

---

## removeClass

**说明：** 移除元素的 CSS 类名

```ts
const removeClass: (el: HTMLElement, ...classNames: string[]) => void
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| el | `HTMLElement` | 是 | - | 目标元素 |
| classNames | `...string[]` | 是 | - | 要移除的类名 |

**返回值：** `void`

**示例：**

```ts
import { removeClass } from '@/utils/style'

removeClass(document.body, 'dark', 'no-scroll')
```

---
