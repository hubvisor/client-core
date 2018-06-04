
// imported from prebid.js
function _uuid (placeholder) {
  if (placeholder) {
    return (placeholder ^ Math.random() * 16 >> placeholder / 4).toString(16)
  }
  return ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, _uuid)
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
 * Contains resolution and rejection methods for an associated promise object.
 * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred|MDN}
 * @typedef {Object} Deferred
 * @property {Promise} promise The associated promise object
 * @property {function(*)} resolve Resolves the associated Promise object with the given parameter
 * @property {function(Error)} reject Rejects the associated Promise object with an error
 * @see defer
 */

/**
 * Creates a Promise and stores its reject and resolve methods in a Deferred for later use.
 * Use with caution, the promise object may never resolve.
 * @returns {Deferred}
 */
export function defer () {
  const deferred = {}
  const promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  deferred.promise = promise

  return deferred
}

/**
 * Creates a promise that resolves after a given delay
 * @param {number} seconds The duration of the pause in seconds
 * @returns {Promise}
 */
export function pause (seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, seconds * 1000)
  })
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
