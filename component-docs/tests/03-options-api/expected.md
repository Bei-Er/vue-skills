# 卡片容器

卡片容器组件，支持标题、阴影和自定义内边距

---

## 示例

```vue
<Card title="用户信息" :padding="24" @close="handleClose">
  <p>卡片内容</p>

  <template #footer>
    <button>查看详情</button>
  </template>
</Card>
```

---

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| title | `String` | 否 | `''` | 卡片标题 |
| shadow | `Boolean` | 否 | `true` | 是否显示阴影 |
| padding | `Number \| String` | 否 | `16` | 内边距 |
| radius | `String` | 否 | `'8px'` | 边框圆角 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | `(e: Event)` | 点击卡片时触发 |
| close | — | 关闭卡片时触发 |

## Slots

| 插槽名 | 说明 |
|--------|------|
| default | 卡片内容 |
| header | 自定义头部内容，覆盖 title |
| footer | 自定义底部内容 |
