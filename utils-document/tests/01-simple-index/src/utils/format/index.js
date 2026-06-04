/**
 * 将日期格式化为指定格式的字符串
 * @param date 要格式化的日期
 * @param format 格式模板，默认 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 * @example
 * ```js
 * formatDate(new Date(2024, 0, 15), 'YYYY/MM/DD')
 * // => '2024/01/15'
 * ```
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
}

/**
 * 将数字格式化为千分位分隔的字符串
 * @param value 要格式化的数字
 * @param separator 千分位分隔符，默认 ','
 * @returns 带千分位分隔符的字符串
 */
export function formatNumber(value, separator = ',') {
  const [int, decimal] = String(value).split('.')
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  return decimal ? `${formatted}.${decimal}` : formatted
}

/** 生成指定范围内的随机整数 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
