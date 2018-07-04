/**
 * Creates a function which will call a provided function only the first time.
 * The returned function will forwards it's arguments to the call and memoize the call return value.
 * @param {function} fn The function to be called only once
 * @returns {function} A function which will call the provided function the first time it is called with it's arguments
 */
export default function once (fn) {
  let result // use an object to handle both result and call flag
  return (...args) => {
    if (!result) {
      result = { value: fn(...args) }
    }
    return result.value
  }
}
