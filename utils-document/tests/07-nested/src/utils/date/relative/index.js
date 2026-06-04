/**
 * 获取相对时间描述（如"3 分钟前"）
 * @param date 目标日期
 * @returns 相对时间描述字符串
 * @example
 * ```js
 * timeAgo(new Date(Date.now() - 60000))
 * // => '1 分钟前'
 * ```
 */
export function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return '刚刚'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} 分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} 小时前`
  const days = Math.floor(hours / 24)
  return `${days} 天前`
}
