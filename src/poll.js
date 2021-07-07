import { pause } from './promise'

/**
 * A callback to be called until the returned value becomes available
 * @callback PollCallback
 * @returns {T | undefined | Promise<T | undefined>}
 * @template T
 */

/**
 * The wait strategy to use for a poll
 * @callback PollStrategy
 * @returns {Promise<boolean>} A promise to be awaited until next poll. The poll will be stopped on falsy values
 */

/**
 * Polls for the presence of a value fetched by a function, within a deadline.
 * @param {PollStrategy} waitStrategy The strategy to use for waiting next poll
 * @param {PollCallback<T>} fetchValue Returns the value T we are interested in.
 * @returns {Promise<T | undefined>} Promise containing the value retrieved by fetchValue.
 * @template T
 */
export async function poll (waitStrategy, fetchValue) {
  let shouldContinue
  do {
    const fetchedValue = await fetchValue()
    if (fetchedValue !== undefined) {
      return fetchedValue
    }
    shouldContinue = await waitStrategy()
  } while (shouldContinue)
}

/**
 * @typedef {Object} ConstantIntervalStrategyOptions
 * @property {number} interval Interval between polls, in seconds.
 * @property {number} [maxTryCount] Maximum poll count
 */

/**
 *
 * @param {ConstantIntervalStrategyOptions} options
 * @returns {PollStrategy}
 */
export function constantInterval ({ interval = 1, maxTryCount } = {}) {
  let currentTry = 1
  return async () => {
    if (maxTryCount !== undefined && currentTry >= maxTryCount) {
      return false
    }
    await pause(interval)
    currentTry += 1
    return true
  }
}

/**
 * @typedef {Object} ExponentialBackoffStrategyOptions
 * @property {number} interval Starting interval between polls, in seconds. Will be doubled after each failure.
 * @property {number} [maxInterval] Maximum interval size
 * @property {number} [maxTryCount] Maximum poll count
 */

/**
 *
 * @param {ExponentialBackoffStrategyOptions} options
 */
export function exponentialBackoff ({ interval = 1, maxInterval, maxTryCount } = {}) {
  let currentInterval = interval
  let currentTry = 1 // the function will be called AFTER first try
  return async () => {
    if (maxTryCount !== undefined && currentTry >= maxTryCount) {
      return false
    }
    await pause(currentInterval)
    currentTry += 1
    currentInterval = 2 * currentInterval
    if (maxInterval !== undefined && currentInterval > maxInterval) {
      currentInterval = maxInterval
    }
    return true
  }
}
