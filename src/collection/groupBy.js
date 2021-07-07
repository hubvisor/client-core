import reduce from './reduce'

/**
 * Creates an object composed of the keys returned by the key function and values that are arrays of values of the initial collection.
 * When multiple items have the same key, they are appened to the array of the result object for this key in iteration order. Iteration order is not guaranteed for objects.
 * When the returned key is null or undefined, the value is filtered out of the resulting object.
 * @param {array|object} source The object or array to be indexed.
 * @param {function} keyFn A callback to be called for each (value, key) pair of the input value with (value, key, source) arguments.
 * @returns {object} An object composed of the keys returned by the key function and values are arrays of values of the initial collection
 */
export default function groupBy (source, keyFn) {
  return reduce(source, (last, value, key, source) => {
    const newKey = keyFn(value, key, source)
    if (newKey !== null && newKey !== undefined) {
      if (!last[newKey]) { last[newKey] = [] }
      last[newKey].push(value)
    }
    return last
  }, {})
}
