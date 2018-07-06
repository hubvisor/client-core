import reduce from './reduce'

/**
 * A forEach function that can be applied to both arrays or objects.
 * Follows `Array.forEach` for semantics except for thisArg ! @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
 * @param {array|object} source The object or array to be iterated on.
 * @param {function} eachFn A callback to be called for each (value, key) pair of the input value with (value, key, source) arguments.
 * @returns {undefined}
 */
export default function forEach (source, eachFn) {
  reduce(source, (last, value, key, source) => eachFn(value, key, source), undefined)
}
