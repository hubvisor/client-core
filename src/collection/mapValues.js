import reduce from './reduce'
import { isArray } from '../types'

/**
 * A map function that can be applied to both arrays or objects. Respects the source object type.
 * For Arrays, it will work like traditional map, for objects it will map the object values to a new object with same keys.
 * @param {array|object} source The object or array to be mapped.
 * @param {function} mapFn A callback to be called for each (value, key) pair of the input value with (value, key, source) arguments.
 * @returns {array|object} An array or object with values returned by the mapping function for each (value, key) pair of the input value.
 */
export default function mapValues (source, mapFn) {
  if (isArray(source)) { return source.map(mapFn) }
  return reduce(source, (last, value, key) => {
    last[key] = mapFn(value, key, source)
    return last
  }, {})
}
