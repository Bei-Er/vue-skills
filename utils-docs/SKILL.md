---
name: vue-skills:utils-docs
description: 当需要为 Vue 项目的 utils 工具方法目录生成 README.md 文档时使用。扫描源文件，提取函数签名、JSDoc 注释、参数、返回值，生成结构化的 API 文档。
---

# 工具方法文档生成

## 概述

扫描 Vue 项目的 utils 目录，按文件夹分组或按根目录文件，为每个文件夹/文件在 `docs/utils/` 下生成独立的 .md 文件。每个文件包含该文件夹/文件下所有函数的说明、参数、返回值、使用示例。

## 适用场景

- 为 Vue 项目的 `src/utils/` 目录下的工具方法批量生成文档
- 已有的 README.md 需要更新或补充
- 新增了工具方法，需要同步更新对应文件夹的文档

## 核心流程

### 第 1 步：定位目标目录

默认扫描 `src/utils/` 目录。用户指定了其他目录时使用用户指定的路径。

### 第 2 步：确认生成范围

在开始执行前，询问用户生成范围：

- **全部生成** — 为 utils 下所有文件夹和根目录文件生成/更新文档
- **局部生成** — 用户指定具体文件夹路径或方法名，只处理指定的部分

### 第 3 步：发现源文件

遍历 utils 目录，识别需要处理的 `.js`、`.mjs`、`.ts`、`.mts` 文件。

```
src/utils/
├── format/
│   ├── index.js
│   ├── date.js
│   └── number.js
├── validate/
│   ├── index.js
│   ├── email.js
│   └── phone.js
├── move-up.js       ← 根目录的文件，也处理
├── move-down.ts     ← 根目录的文件，也处理
└── common.d.ts      ← 纯类型文件，忽略
```

**规则：**
- 子文件夹 → 扫描其中所有 `.js`、`.mjs`、`.ts`、`.mts` 文件的导出
- 根目录 → 处理所有 `.js`、`.mjs`、`.ts`、`.mts` 文件
- 纯类型文件（`.d.ts`）→ 忽略

### 第 4 步：扫描源文件

读取第 3 步发现的所有 `.ts`、`.js`、`.mts`、`.mjs` 文件。

每个文件提取：
1. **导出函数** — `export function name(...)`、`export const name = (...)`
2. **JSDoc 注释** — 导出声明上方的 `/** 描述 */`
3. **类型信息** — TS 从类型注解获取，JS 从 JSDoc 的 `@type`、`@param`、`@returns` 获取
4. **默认参数值**

### 第 5 步：提取函数元数据

对每个导出函数，收集以下信息：

| 字段 | 来源 | 示例 |
|------|------|------|
| 函数名 | 导出标识符 | `formatDate` |
| 说明 | JSDoc `@description` 或首行 | 将日期格式化为字符串 |
| 参数 | 函数参数 + `@param` 标签 | `date: Date, format?: string` |
| 返回值 | 返回类型 + `@returns` 标签 | `string` |
| 示例 | `@example` 块或推断的用法 | `formatDate(new Date(), 'YYYY-MM-DD')` |

**提取规则：**
- 无 JSDoc 时，从函数名和逻辑推断说明
- 无 `@param` 描述时，从参数名和用法推断
- 无 `@returns` 时，从 return 语句推断
- 按源文件分组

**JS 文件特殊处理：**
- 无类型注解时，从 JSDoc 的 `@param {Type}` 和 `@returns {Type}` 提取类型
- 如果 JSDoc 也没有类型信息，类型列显示 `-`，从函数体逻辑推断说明
- 签名代码块使用 `js` 而非 `ts` 标记

### 第 6 步：生成文档

使用下方模板，输出到 `docs/utils/`。

**输出文件命名：**
- 子文件夹 → 文件夹名（如 `format/` → `format.md`）
- 根目录文件 → 文件名去扩展名（如 `move-up.js` → `move-up.md`）

**文件名分组规则：**
- 文件夹内只有 `index.ts`（或 `index.js`）一个源文件 → 不显示文件名分组，直接列出函数
- 文件夹内有多个源文件 → 按文件名（不含扩展名）分组，`index` 文件显示为 `index`
- 根目录文件 → 无分组，直接列出函数

## README 模板

````markdown
# 中文名称

（标题从目录名、函数用途推断中文名称）

---

## functionName1

**说明：** 一句话描述函数的作用

```js
function functionName1(param1, param2)
```

**示例：**

```js
import { functionName1 } from '@/utils/format'

const result = functionName1('hello', 42)
// => true
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| param1 | `string` | 是 | - | 参数说明 |
| param2 | `number` | 否 | `0` | 参数说明 |

**返回值：** `boolean` — 返回值说明

---
````

## 边界情况处理

| 场景 | 处理方式 |
|------|----------|
| 重新导出（`export { foo } from './bar'`） | 追溯到原始文件，只文档化一次 |
| 函数重载 | 分别文档化每个重载签名 |
| 泛型函数（`function foo<T>`） | TS 文件保留泛型类型参数，JS 文件忽略泛型 |
| 类导出 | 只文档化公共方法 |
| 纯类型导出（`export type`） | 跳过，只文档化运行时值 |
| 桶文件（`index.js`、`index.ts`） | 与其他文件同等对待，扫描其中的导出 |
| 完全没有 JSDoc | 从函数体逻辑、命名、return 语句推断 |
| JS 文件无类型注解 | 优先从 JSDoc `@param {Type}` 提取，都没有则类型显示 `-` |

## 常见错误

| 错误 | 正确做法 |
|------|----------|
| 文档化了内部（未导出）函数 | 只处理 `export` 声明 |
| 把类型定义当成函数 | 只文档化函数/const 声明 |
| 把文档生成到 src/utils/ 内 | 放在 `docs/utils/` 目录内 |
| 忽略子目录 | 递归扫描，按相对路径分组 |
| 重复文档化重新导出的函数 | 在源文件处文档化一次 |