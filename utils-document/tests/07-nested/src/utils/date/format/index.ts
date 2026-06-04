/**
 * 将日期格式化为中文格式
 * @param date 目标日期
 * @returns 中文格式的日期字符串
 */
export function toChineseDate(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

/** 判断是否为今天 */
export function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}
