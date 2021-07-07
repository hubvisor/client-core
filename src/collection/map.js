import reduce from './reduce'

/**
 * A map function that can be applied to both arrays or objects and returns an array of mapped values.
 * @param {array|object} source The object or array to be mapped.
 * @param {function} mapFn A callback to be called for each (value, key) pair of the input value with (value, key, source) arguments.
 * @returns {array} An array of values returned by the mapping function for each (value, key) pair of the input value
 */
export default function map (source, mapFn, { flatten = false, compact = false } = {}) {
  return reduce(source, (last, value, key) => {
    last.push(mapFn(value, key, source))
    return last
  }, [])
}
