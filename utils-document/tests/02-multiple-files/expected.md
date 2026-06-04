# validate

---

## email

### isEmail

**说明：** 验证邮箱格式是否合法

```ts
function isEmail(email: string): boolean
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| email | `string` | 是 | - | 邮箱地址字符串 |

**返回值：** `boolean` — 是否为合法邮箱

**示例：**

```ts
import { isEmail } from '@/utils/validate/email'

isEmail('test@example.com')
// => true

isEmail('invalid-email')
// => false
```

---

## phone

### isPhone

**说明：** 验证手机号格式是否合法（中国大陆）

```ts
function isPhone(phone: string): boolean
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| phone | `string` | 是 | - | 手机号码字符串 |

**返回值：** `boolean` — 是否为合法手机号

**示例：**

```ts
import { isPhone } from '@/utils/validate/phone'

isPhone('13812345678')
// => true
```

### isEmpty

**说明：** 检测值是否为空（null、undefined、空字符串、空数组）

```ts
function isEmpty(value: unknown): boolean
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| value | `unknown` | 是 | - | 要检测的值 |

**返回值：** `boolean` — 是否为空

**示例：**

```ts
import { isEmpty } from '@/utils/validate/phone'

isEmpty('')
// => true

isEmpty([1, 2, 3])
// => false
```

---