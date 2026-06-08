# DataList

数据列表组件，支持自定义列表项和状态管理

---

## 示例

```vue
<DataList
  :config="listConfig"
  :items="items"
  status="idle"
  :count="items.length"
  @change="handleChange"
  @delete="handleDelete"
>
  <template #item="{ item, remove }">
    <span>{{ item.label }}</span>
    <button @click="remove">删除</button>
  </template>
</DataList>
```

---

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| config | `Record<string, unknown>` | 是 | - | 配置对象 |
| items | `Array<{ id: number; label: string }>` | 是 | - | 列表数据 |
| status | `'idle' \| 'loading' \| 'error' \| 'success'` | 是 | - | 当前状态 |
| callback | `(id: number) => void` | 否 | - | 回调函数 |
| count | `number` | 是 | - | 数量 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| change | `(payload: { page: number })` | 数据变化时触发 |
| delete | `(index: number)` | 删除项目时触发 |

## Slots

| 插槽名 | 作用域参数 | 说明 |
|--------|-----------|------|
| default | — | 列表底部内容 |
| item | `{ item, remove }` | 自定义列表项内容 |

## Exposes

| 名称 | 类型 | 说明 |
|------|------|------|
| reset | `() => void` | 重置列表 |
| remove | `(index: number) => void` | 删除指定项 |
