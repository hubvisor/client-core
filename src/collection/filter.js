import { isArray } from '../types'
import reduce from './reduce'

/**
 * Filter keys or indices of an object or array collection according to a predicate.
 * @param {array|object} source The object or array to be filtered.
 * @param {function} predicate The object or array to be filtered.
 * @returns {array|object} The filtered collection.
 */
export default function filter (source, predicate) {
  if (isArray(source)) { return source.filter(predicate) }
  return reduce(source, (last, value, key) => {
    if (predicate(value, key, source)) {
      last[key] = value
    }
    return last
  }, {})
}
