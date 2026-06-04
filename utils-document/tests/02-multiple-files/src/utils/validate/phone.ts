/**
 * 验证手机号格式是否合法（中国大陆）
 * @param phone 手机号码字符串
 * @returns 是否为合法手机号
 */
export function isPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

/** 检测值是否为空（null、undefined、空字符串、空数组） */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined || value === '') return true
  if (Array.isArray(value)) return value.length === 0
  return false
}