import { isarray } from './types'

// imported from prebid.js
function _uuid (placeholder) {
  if (placeholder) {
    return (placeholder ^ Math.random() * 16 >> placeholder / 4).toString(16)
  }
  return ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, _uuid)
}

export function hashCode (str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

/**
 * Generates a uuid-compliant string.
 * The level of randomness does not garantee a safe use for security-critical missions but it may be good enough for some use cases.
 * @returns {string}
 */
export function uuid () {
  return _uuid()
}

/**
 * Binds all methods of an object instance to this instance
 * Allows safer use of `this` from this instance methods
 * @param {Object} self The object to rebind methods for
 * @returns {Object} The provided `self` object for chaining
 */
export function autobind (self) {
  for (const key of Object.getOwnPropertyNames(self.constructor.prototype)) {
    const val = self[key]

    if (key !== 'constructor' && typeof val === 'function') {
      self[key] = val.bind(self)
    }
  }
  return self
}

/**
 * Wraps values in an array when they are not. null and undefined values are converted to empty array.
 * @param {any} [val] The value to be wrapped in an array
 */
export function arrify (val) {
  if (val === undefined || val === null) { return [] }
  return isarray(val) ? Array.from(val) : [ val ]
}
