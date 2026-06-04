/**
 * 带超时的 fetch 请求
 * @param url 请求地址
 * @param options 请求配置
 * @param timeout 超时时间（毫秒），默认 10000
 * @returns 响应数据
 * @example
 * ```js
 * const data = await fetchWithTimeout('/api/user', { method: 'GET' }, 5000)
 * ```
 */
export async function fetchWithTimeout(url, options, timeout = 10000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(id)
  }
}

/**
 * 解析响应为 JSON
 */
export const parseJSON = async (response) => {
  return await response.json()
}

/**
 * 重试请求
 * @param fn 要重试的异步函数
 * @param retries 重试次数，默认 3
 * @param delay 每次重试间隔（毫秒），默认 1000
 */
export async function retry(fn, retries = 3, delay = 1000) {
  try {
    return await fn()
  } catch (error) {
    if (retries <= 0) throw error
    await new Promise((resolve) => setTimeout(resolve, delay))
    return retry(fn, retries - 1, delay)
  }
}

/** 简单的节流函数 */
export const throttle = (fn, wait) => {
  let lastTime = 0
  return (...args) => {
    const now = Date.now()
    if (now - lastTime >= wait) {
      lastTime = now
      fn(...args)
    }
  }
}
