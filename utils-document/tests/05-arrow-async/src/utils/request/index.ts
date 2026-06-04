/**
 * 带超时的 fetch 请求
 * @param url 请求地址
 * @param options 请求配置
 * @param timeout 超时时间（毫秒），默认 10000
 * @returns 响应数据
 * @example
 * ```ts
 * const data = await fetchWithTimeout('/api/user', { method: 'GET' }, 5000)
 * ```
 */
export async function fetchWithTimeout(
  url: string,
  options?: RequestInit,
  timeout: number = 10000
): Promise<Response> {
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
export const parseJSON = async <T = unknown>(response: Response): Promise<T> => {
  return (await response.json()) as T
}

/**
 * 重试请求
 * @param fn 要重试的异步函数
 * @param retries 重试次数，默认 3
 * @param delay 每次重试间隔（毫秒），默认 1000
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries <= 0) throw error
    await new Promise((resolve) => setTimeout(resolve, delay))
    return retry(fn, retries - 1, delay)
  }
}

/** 简单的节流函数 */
export const throttle = <T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let lastTime = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastTime >= wait) {
      lastTime = now
      fn(...args)
    }
  }
}
