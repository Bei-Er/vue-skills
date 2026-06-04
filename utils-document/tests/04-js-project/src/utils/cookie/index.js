/**
 * 获取 Cookie 值
 * @param {string} name Cookie 名称
 * @returns {string|null} Cookie 值，不存在时返回 null
 * @example
 * ```js
 * getCookie('token')
 * // => 'abc123'
 * ```
 */
export function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$1') + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

// 没有 JSDoc 的函数
export function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/`
}

/**
 * 删除指定 Cookie
 * @param {string} name Cookie 名称
 */
export function removeCookie(name) {
  setCookie(name, '', -1)
}
