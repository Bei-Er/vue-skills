/**
 * 将数组按指定大小分块
 * @param arr 源数组
 * @param size 每块大小
 * @returns 分块后的二维数组
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2)
 * // => [[1, 2], [3, 4], [5]]
 * ```
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}