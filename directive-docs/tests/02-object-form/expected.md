# 加载状态(0)

---

## 使用示例

```vue
<template>
  <div v-loading="isLoading">内容</div>
</template>
```

---

## 指令值

| 类型 | 说明 |
|------|------|
| `boolean` | 是否显示加载遮罩 |

---

## 钩子函数

| 钩子 | 说明 |
|------|------|
| mounted | 指令值绑定时添加加载遮罩 |
| updated | 指令值变化时切换加载遮罩 |
| unmounted | 元素卸载时移除加载遮罩 |
