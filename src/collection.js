import { isarray } from './types'

/**
 * A reduce function that can be applied to both arrays or objects.
 * Follows `Array.reduce` for semantics. @see {@link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce}
 * @param {array|object} source The value to be reduced.
 * @param {function} reducer A callback to be called for each (value, key) pair of the input value.
 * @param {*} initialValue The inital value provided as memo.
 */
export function _reduce (source, reducer, initialValue) {
  if (isarray(source)) {
    // strange bug, passing undefined is not the same as having no second argument
    return initialValue === undefined ? source.reduce(reducer) : source.reduce(reducer, initialValue)
  }
  return Object.entries(source).reduce((memo, [ key, value ]) => reducer(memo, value, key, source), initialValue)
}
