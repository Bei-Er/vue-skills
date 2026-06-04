// 没有 JSDoc 的函数，需要从逻辑推断说明
export function flatten(arr) {
  return arr.flat()
}

/**
 * 根据条件过滤数组并返回匹配的元素
 * @param list 源数组
 * @param predicate 过滤条件
 * @returns 过滤后的新数组
 */
export function filterBy(list, predicate) {
  return list.filter(predicate)
}

/** 去重 */
export function unique(arr) {
  return [...new Set(arr)]
}

// 内部辅助函数，未导出，不应出现在文档中
function internalHelper(arr) {
  arr.sort()
}
