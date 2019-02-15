import { isArray } from '../types'
import reduce from './reduce'

/**
 * Flattens array elements of a source array or array values of a source object.
 * Keys are discarded.
 * Iteration order not guaranteed on objects.
 * Only first level of array is flattened
 * @param {array|object} source The object or array to be flattened.
 * @returns {array} An array of flattened values
 */
export default function flatten (source) {
  return reduce(source, (last, value) => {
    if (isArray(value)) {
      last.push(...value)
    } else {
      last.push(value)
    }
    return last
  }, [])
}
