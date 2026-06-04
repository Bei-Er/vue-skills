# Button

通用按钮组件

---

## 示例

```vue
<Button type="primary" size="medium">
  确认
</Button>
```

---

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| type | `'primary' \| 'secondary' \| 'danger'` | 否 | `'primary'` | 按钮类型 |
| disabled | `boolean` | 否 | `false` | 是否禁用 |
| size | `'small' \| 'medium' \| 'large'` | 否 | `'medium'` | 按钮尺寸 |

## Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |
