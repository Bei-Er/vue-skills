/**
 * 验证邮箱格式是否合法
 * @param email 邮箱地址字符串
 * @returns 是否为合法邮箱
 */
export function isEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}