import filter from './filter'

/**
 * Removes null or undefined elements from a collection.
 * Only first level of array is compacted
 * @param {array|object} source The object or array to be compacted.
 * @returns {array} An array of non-array values
 */
export default function compact (source) {
  return filter(source, v => v !== null && v !== undefined)
}
