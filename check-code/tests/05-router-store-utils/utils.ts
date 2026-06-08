// 1: 工具函数有副作用
export function formatDate(date: Date): string {
  document.title = `Date: ${date.toISOString()}`
  return date.toLocaleDateString()
}

// 2: 闭包引用陈旧变量
export function createCounter() {
  let count = 0
  return {
    increment() {
      count++
    },
    getCount() {
      return count
    },
    // 这里返回的函数捕获了 count 的原始值
    getSnapshot() {
      return () => count
    }
  }
}

// 3: 默认参数可简化
export function greet(name: string, greeting?: string) {
  if (greeting === undefined) {
    greeting = 'Hello'
  }
  return `${greeting}, ${name}!`
}
