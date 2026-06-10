# 对话框

对话框组件，支持自定义头部和底部插槽

---

## 示例

```vue
<Dialog v-model="visible" title="提示">
  <p>确定要删除吗？</p>

  <template #footer="{ close, confirm }">
    <button @click="close">取消</button>
    <button @click="confirm">确定</button>
  </template>
</Dialog>
```

---

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| modelValue | `boolean` | 是 | - | 是否显示对话框 |
| title | `string` | 是 | - | 对话框标题 |
| width | `string` | 否 | - | 对话框宽度 |
| closeOnClickModal | `boolean` | 否 | - | 点击遮罩层是否关闭 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | `(value: boolean)` | 显示状态变化时触发 |
| confirm | — | 点击确定按钮时触发 |
| cancel | — | 点击取消按钮时触发 |

## Slots

| 插槽名 | 作用域参数 | 说明 |
|--------|-----------|------|
| default | — | 对话框内容 |
| header | — | 自定义头部内容 |
| footer | `{ close, confirm }` | 自定义底部内容 |

## Exposes

| 名称 | 类型 | 说明 |
|------|------|------|
| open | `() => void` | 打开对话框 |
| close | `() => void` | 关闭对话框 |
