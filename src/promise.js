
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
 * @typedef {Object} PollOptions
 * @property {number} interval Interval between fetchValue checks, in seconds.
 * @property {number} deadline Deadline, in seconds.
 */

/**
 * Polls for the presence of a value fetched by a function, within a deadline.
 * @param {PollOptions}
 * @param {function} fetchValue Returns the value T we are interested in.
 * @returns {Promise<T>} Promise containing the value retrieved by fetchValue.
 * @template T
 */
export async function poll ({ interval, deadline }, fetchValue) {
  let deadlineElapsed = false
  let handle = setTimeout(() => { deadlineElapsed = true }, deadline * 1000)

  const cleanup = () => {
    /* istanbul ignore next */
    if (handle) {
      clearTimeout(handle)
      handle = null
    }
  }

  /* eslint-disable no-unmodified-loop-condition */
  while (!deadlineElapsed) {
    const lastValue = fetchValue()
    if (lastValue !== undefined) {
      cleanup()
      return lastValue
    }
    await pause(interval)
  }

  cleanup()
}
