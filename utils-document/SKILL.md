---
name: utils-document
description: 当需要为 Vue 项目的 utils 工具方法目录生成 README.md 文档时使用。扫描源文件，提取函数签名、JSDoc 注释、参数、返回值，生成结构化的 API 文档。
---

# 工具方法文档生成

## 概述

扫描 Vue 项目的 utils 目录，按文件夹分组，为每个文件夹生成 README.md，与工具方法源文件同级。每个 README 包含该文件夹下所有函数的说明、参数、返回值、使用示例。

## 适用场景

- 为 Vue 项目的 `src/utils/` 目录下的工具方法批量生成文档
- 已有的 README.md 需要更新或补充
- 新增了工具方法，需要同步更新对应文件夹的文档

## 核心流程

### 第 1 步：定位目标目录

默认扫描 `src/utils/` 目录。用户指定了其他目录时使用用户指定的路径。

### 第 2 步：确认生成范围

在开始执行前，询问用户生成范围：

- **全部生成** — 为 utils 下所有子文件夹生成/更新 README.md
- **局部生成** — 用户指定具体文件夹路径或方法名，只处理指定的部分

### 第 3 步：扫描目录结构

遍历 utils 下的所有子文件夹，识别分组方式。目录结构示例：

```
src/utils/
├── format/
│   ├── index.ts
│   ├── date.ts
│   ├── number.ts
│   └── README.md    ← 为该文件夹生成
├── validate/
│   ├── index.ts
│   ├── email.ts
│   ├── phone.ts
│   └── README.md    ← 为该文件夹生成
└── common.ts        ← 散落在根目录的单文件，忽略
```

**规则：**
- 每个子文件夹 → 扫描所有 `.ts`、`.js`、`.mts` 文件中的导出，为其生成 README.md
- utils 根目录下的散落单文件 → 忽略，不生成文档

### 第 4 步：扫描源文件

读取每个子文件夹下的所有 `.ts`、`.js`、`.mts`、`.mjs` 文件。

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

### 第 6 步：生成 README.md

使用下方模板，输出到 **每个子文件夹内**，与源文件同级。

**文件名分组规则：**
- 如果文件夹内只有 `index.ts`（或 `index.js`）一个源文件 → **不显示文件名分组**，直接列出函数
- 如果文件夹内有多个源文件 → 按文件名（不含扩展名）分组，`index` 文件显示为 `index`

## README 模板

````markdown
# {目录名}

---

## functionName1

**说明：** 一句话描述函数的作用

```ts
function functionName1(param1: string, param2?: number): boolean
```

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| param1 | `string` | 是 | - | 参数说明 |
| param2 | `number` | 否 | `0` | 参数说明 |

**返回值：** `boolean` — 返回值说明

**示例：**

```ts
import { functionName1 } from '@/utils/format'

const result = functionName1('hello', 42)
// => true
```

---
````

## 边界情况处理

| 场景 | 处理方式 |
|------|----------|
| 重新导出（`export { foo } from './bar'`） | 追溯到原始文件，只文档化一次 |
| 函数重载 | 分别文档化每个重载签名 |
| 泛型函数（`function foo<T>`） | 保留泛型类型参数 |
| 类导出 | 只文档化公共方法 |
| 纯类型导出（`export type`） | 跳过，只文档化运行时值 |
| 桶文件（`index.ts`） | 与其他文件同等对待，扫描其中的导出 |
| 完全没有 JSDoc | 从函数体逻辑、命名、return 语句推断 |
| JS 文件无类型注解 | 优先从 JSDoc `@param {Type}` 提取，都没有则类型显示 `-` |

## 常见错误

| 错误 | 正确做法 |
|------|----------|
| 文档化了内部（未导出）函数 | 只处理 `export` 声明 |
| 把类型定义当成函数 | 只文档化函数/const 声明 |
| 把 README 生成到项目根目录 | 放在 utils 目录内 |
| 忽略子目录 | 递归扫描，按相对路径分组 |
| 重复文档化重新导出的函数 | 在源文件处文档化一次 |