import { isDebug } from './environment'
import { hashCode } from './util'

// generates a unique color for each tag according to the string to quickly identify each sub-system tag
function colorFromTag (tag) {
  if (!tag) { return '#607D8B' }

  const angle = Math.PI // because why not
  // hue depend on tag hash, saturation and value are hand-picked from a flat color
  const hue = (hashCode(tag) * angle) % 360
  const saturation = 70
  const value = 53
  return `hsl(${hue}, ${saturation}%, ${value}%)`
}

function createBadge ({ name, level, tag, color }) {
  const tagColor = colorFromTag(tag)
  const badge = [
    {
      value: name,
      style: 'background: linear-gradient(#4D4D4D, #5D5D5D); color: #fff; padding: 2px 4px; border-top-left-radius: 4px; border-bottom-left-radius: 4px;'
    }, {
      value: level,
      style: `background: ${color}; color: #fff; padding: 2px 4px;`
    }, {
      value: tag,
      style: `background: ${tagColor}; color: #fff; padding: 2px 2px; border-top-right-radius: 4px; border-bottom-right-radius: 4px;`
    }
  ].filter(item => item.value)

  const badgeFormatString = badge.map(item => `%c${item.value}`).join('')
  const badgeArgs = badge.map(item => item.style)
  return [ badgeFormatString, ...badgeArgs ]
}

function createLogger ({ name, level, color, output, tag }) {
  // noop when not debugging
  if (!isDebug) { return () => {} }

  const badge = createBadge({ name, level, tag, color })

  return (...args) => {
    output(...badge, ...args)
  }
}

/**
 * A logger class which prepends messages with a badge containing the log name, level and optionally a tag
 */
class Logger {
  /**
   * @param {string} name The name of the log to display in every message
   * @param {string} [tag] An optional tag (for example to display a specific subsystem messages)
   */
  constructor ({ name, tag } = {}) {
    /**
     * Prints a message with verbose level
     * @param {...*} message The message to log
     * @function
     */
    this.trace = createLogger({ name, tag, level: 'trace', color: '#000', output: console.log })

    /**
     * Prints a message with debug level
     * @param {...*} message The message to log
     * @function
     */
    this.debug = createLogger({ name, tag, level: 'debug', color: '#9C27B0', output: console.log })

    /**
     * Prints a message with normal level
     * @param {...*} message The message to log
     * @function
     */
    this.info = createLogger({ name, tag, level: 'info', color: '#4CAF50', output: console.log })

    /**
     * Prints a message with warning level
     * @param {...*} message The message to log
     * @function
     */
    this.warn = createLogger({ name, tag, level: 'warn', color: '#FF9800', output: console.warn })

    /**
     * Prints a message with error level
     * @param {...*} message The message to log
     * @function
     */
    this.error = createLogger({ name, tag, level: 'error', color: '#F44336', output: console.error })

    /**
     * Instantiates a new Logger which will use a given tag
     * @param {string} tag The tag to create the logger with
     * @returns {Logger} The new logger using the provided tag
     */
    this.tag = tag => new Logger({ name, tag })
  }
}

// Export the root logger instance
export default new Logger({ name: 'HUBVISOR' })
