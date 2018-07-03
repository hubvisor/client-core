import { isarray } from '../types'

/**
 * A reduce function that can be applied to both arrays or objects.
 * Follows `Array.reduce` for semantics excepted that initialValue is required! @see {@link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce}
 * @param {array|object} source The value to be reduced.
 * @param {function} reducer A callback to be called for each (value, key) pair of the input value with (last, value, key, source) arguments.
 * @param {*} initialValue The inital value provided as initial "last" value.
 */
export default function reduce (source, reducer, initialValue) {
  if (arguments.length < 3) { throw new Error('initialValue is required for _reduce !') }

  const reduceArray = isarray(source)
  const collection = reduceArray ? source : Object.entries(source)
  const iterator = reduceArray ? reducer : (last, [ key, value ]) => reducer(last, value, key, source)
  return collection.reduce(iterator, initialValue)
}
