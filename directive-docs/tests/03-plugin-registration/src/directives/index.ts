export default {
  install(app) {
    /**
     * 权限控制指令
     * 根据用户权限控制元素的显示隐藏
     */
    app.directive('permission', (el, binding) => {
      const { value } = binding
      const userRoles = ['admin', 'editor']

      if (value && !userRoles.includes(value)) {
        el.parentNode?.removeChild(el)
      }
    })

    /**
     * 防抖指令
 * 对元素的点击事件添加防抖处理
 * 支持 .immediate 修饰符立即执行
     */
    app.directive('debounce', {
      mounted(el, binding) {
        const delay = binding.arg ? parseInt(binding.arg) : 300
        const immediate = binding.modifiers.immediate
        let timer = null

        el.addEventListener('click', () => {
          if (immediate && !timer) {
            binding.value()
          }
          clearTimeout(timer)
          timer = setTimeout(() => {
            if (!immediate) {
              binding.value()
            }
            timer = null
          }, delay)
        })
      },
      unmounted(el) {
        el.removeEventListener('click')
      }
    })
  }
}
