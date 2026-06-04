interface SizeOptions {
  width?: number
  height?: number
  unit?: string
}

/**
 * 生成 CSS 尺寸字符串
 * @param options 尺寸配置
 * @returns CSS 尺寸字符串
 * @example
 * ```ts
 * toSize({ width: 100, height: 200, unit: 'px' })
 * // => 'width: 100px; height: 200px;'
 * ```
 */
export function toSize({ width, height, unit = 'px' }: SizeOptions): string {
  const parts: string[] = []
  if (width !== undefined) parts.push(`width: ${width}${unit}`)
  if (height !== undefined) parts.push(`height: ${height}${unit}`)
  return parts.join('; ') + ';'
}

/**
 * 将 RGB 值转为十六进制颜色
 * @param r 红色值 (0-255)
 * @param g 绿色值 (0-255)
 * @param b 蓝色值 (0-255)
 * @returns 十六进制颜色字符串
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

/** 为元素添加 CSS 类名 */
export const addClass = (el: HTMLElement, ...classNames: string[]): void => {
  el.classList.add(...classNames)
}

/** 移除元素的 CSS 类名 */
export const removeClass = (el: HTMLElement, ...classNames: string[]): void => {
  el.classList.remove(...classNames)
}
