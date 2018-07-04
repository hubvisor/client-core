
/**
 * Creates a debounced version of a function.
 * The debounced function will call the original function at the end of the provided time interval if it has not been called during this interval.
 * The timer is reset each time the debounced function is called.
 * The original function will be called with the last set of arguments the debounced function is called with.
 * @param {function} fn The original function to create a debounced version from.
 * @param {number} seconds The debounce time interval in seconds.
 * @returns {function} The debounced version of the source function.
 */
export default function debounce (fn, seconds) {
  let timeout = null
  return (...args) => {
    if (timeout) { clearTimeout(timeout) }
    timeout = setTimeout(() => {
      timeout = null
      fn(...args)
    }, seconds * 1000)
  }
}
