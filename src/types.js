/**
 * Tests whether a reference is a string.
 * @param {any} val the value to be tested
 * @returns {boolean}
 */
export function isstring (val) {
  return (val instanceof String) || (typeof val === 'string')
}

/**
 * Tests whether a reference is a number.
 * @param {any} val the value to be tested
 * @returns {boolean}
 */
export function isnum (val) {
  return (val instanceof Number) || (typeof val === 'number')
}

/**
 * Tests whether a reference is a boolean.
 * @param {any} val the value to be tested
 * @returns {boolean}
 */
export function isbool (val) {
  return (val instanceof Boolean) || (typeof val === 'boolean')
}

/**
 * Tests whether a reference is a function.
 * @param {any} val the value to be tested
 * @returns {boolean}
 */
export function isfunc (val) {
  return typeof val === 'function'
}

/**
 * Tests whether a reference is an array.
 * @param {any} val the value to be tested
 * @returns {boolean}
 */
export function isarray (val) {
  return Array.isArray(val)
}

/**
 * Tests whether a reference is an object.
 * Warning, array are objects.
 * @param {any} val the value to be tested
 * @returns {boolean}
 */
export function isobj (val) {
  // babel transpiles typeof in a strange way, force returning a boolean
  return !!(val && (typeof val === 'object'))
}
