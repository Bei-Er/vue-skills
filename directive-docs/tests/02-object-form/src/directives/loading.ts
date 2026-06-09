/**
 * 加载状态指令
 * 在元素上显示加载遮罩
 */
export const vLoading = {
  mounted(el: HTMLElement, binding: { value: boolean }) {
    if (binding.value) {
      addMask(el)
    }
  },
  updated(el: HTMLElement, binding: { value: boolean; oldValue: boolean }) {
    if (binding.value && !binding.oldValue) {
      addMask(el)
    } else if (!binding.value && binding.oldValue) {
      removeMask(el)
    }
  },
  unmounted(el: HTMLElement) {
    removeMask(el)
  }
}

function addMask(el: HTMLElement) {
  const mask = document.createElement('div')
  mask.className = 'loading-mask'
  el.appendChild(mask)
}

function removeMask(el: HTMLElement) {
  const mask = el.querySelector('.loading-mask')
  if (mask) {
    mask.remove()
  }
}
