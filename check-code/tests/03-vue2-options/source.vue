<script>
export default {
  // 1: data 是对象而不是函数
  data: {
    list: [],
    count: 0
  },

  props: {
    title: String,
    items: Array
  },

  computed: {
    activeItems() {
      // 2: computed 中有副作用
      console.log('computed called')
      return this.items.filter(i => i.active)
    }
  },

  watch: {
    // 3: 箭头函数丢失 this
    count: (newVal) => {
      this.list = []
    },

    items: {
      handler(val) {
        // 4: 数组索引直接赋值
        val[0] = { id: 1, name: 'first' }

        // 5: 动态添加对象属性
        this.newProp = val.length
      },
      deep: true
    }
  },

  methods: {
    addItem() {
      // 6: 直接修改 props
      this.items.push({ id: Date.now(), name: 'new' })

      // 7: 应该是 computed
      this.$emit('update', this.list.length)
    },

    handleData(newVal) {
      // 8: delete 响应式属性
      delete this.count
    }
  }
}
</script>

<template>
  <div>
    <!-- 9: v-for 使用 index 作为 key -->
    <div v-for="(item, index) in list" :key="index">
      {{ item.name }}
    </div>
  </div>
</template>
