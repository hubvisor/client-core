
function parseQuery (queryString) {
  if (!queryString) { return {} } // shortcut

  while (queryString.startsWith('?')) {
    queryString = queryString.substring(1)
  }

  return queryString.split('&').reduce((acc, pair) => {
    const [ key, value ] = pair.split('=').map(decodeURIComponent)
    // does not handle multiple value per key (e.g arrays) and overwrites previous value
    acc[key] = value
    return acc
  }, {})
}

const debugStorageKey = 'hubvisor:debug'

function localStorageFlag () {
  return window.localStorage && window.localStorage.getItem(debugStorageKey)
}

function urlFlag () {
  const params = parseQuery(window && window.location && window.location.search)
  return params['hubvisor_debug']
}

/**
 * The NODE_ENV equivalent for the browser.
 * It will be set to production in release builds by webpack.
 * @const {string}
 */
export const env = (process.env.NODE_ENV || 'development')

/**
 * Determines whether the current code is running in a production build.
 * @const {boolean}
 */
export const isProduction = (env === 'production')

/**
 * Determines whether the current code is executed in a browser ()
 */
export const isBrowser = (process.browser)

/**
 * The current code version tag. Injected by webpack in browser environments. Injected by {@link https://docs.npmjs.com/misc/scripts#packagejson-vars|npmjs} in node environments.
 * @const {string}
 */
export const version = process.env.VERSION || process.env.npm_package_version

/**
 * Sets whether future application executions should be run in debug mode.
 * @param {boolean} enabled true to enable debug mode. false otherwise.
 */
export function storeDebugFlag (enabled) {
  if (!window.localStorage) { return }

  if (enabled) {
    window.localStorage.setItem(debugStorageKey, 'true')
  } else {
    window.localStorage.removeItem(debugStorageKey)
  }
}

/**
 * Determines whether the application runs in debug mode.
 * @const {boolean}
 */
export const isDebug = (() => {
  if (!isProduction) { return true }

  const validValues = [ '1', 'true', 'yes' ]
  const availableFlags = [ urlFlag(), localStorageFlag() ]

  for (const flag of availableFlags) {
    const isDebugFlagSet = flag && validValues.indexOf(flag) >= 0
    if (isDebugFlagSet) { return true }
  }

  return false
})()
