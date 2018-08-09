import reduce from './reduce'

/**
 * A reduce variant where the initialValue is passed as memo at each iteration. The result of reducer is ignored.
 * This version is more simple to use than reduce when the goal is to mutate the memo.
 * @see reduce
 * @param {array|object} source The value to be iterated on.
 * @param {function} reducer A callback to be called for each (value, key) pair of the input value with (memo, value, key, source) arguments.
 * @param {*} initialValue The reference to be provided as memo for each iteration.
 * @returns {*} The initialValue reference
 */
export default function transform (source, reducer, initialValue) {
  return reduce(source, (memo, ...rest) => {
    reducer(memo, ...rest)
    return memo
  }, initialValue)
}
