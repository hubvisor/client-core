import { autobind } from '../util'
import consoleLog from './consoleLogger'

// because of https://github.com/jsdoc3/jsdoc/issues/1132
/** @module Log */

/**
 * This callback is displayed as part of the Requester class.
 * @callback Log~Logger
 * @param {Object} message The message to be logged
 * @param {string} message.level The log level to use for this message
 * @param {string} message.name The log name to use for this message
 * @param {string} message.tag The log tag to use for this message
 * @param {any[]} items The elements to log
 */

/**
 * Logs messages to a logger implementation
 */
export default class Log {
  static console ({ name, tag } = {}) { return new Log({ name, tag, logger: consoleLog }) }

  static noop ({ name, tag } = {}) { return new Log({ name, tag }) }

  /**
   * @param {Object} [options] The options for this log
   * @param {string} [options.name] The name of the log
   * @param {string} [options.tag] An optional tag (for example to display a specific subsystem messages)
   * @param {Log~Logger} [options.logger] An optional logger to direct outputs to. If no value is provided, logs functions will be noops
   */
  constructor ({ name, tag, logger } = {}) {
    this._name = name
    this._tag = tag
    this._logger = logger

    const noop = () => {}
    const log = (level, items) => logger({ level, name, tag, items })
    this._log = logger ? log : noop

    autobind(this)
  }

  /**
   * Prints a message with verbose level
   * @param {...*} items The items to log
   */
  trace (...items) { this._log('trace', items) }

  /**
   * Prints a message with debug level
   * @param {...*} items The items to log
   */
  debug (...items) { this._log('debug', items) }

  /**
   * Prints a message with normal level
   * @param {...*} items The items to log
   */
  info (...items) { this._log('info', items) }

  /**
   * Prints a message with warning level
   * @param {...*} items The items to log
   */
  warn (...items) { this._log('warn', items) }

  /**
   * Prints a message with error level
   * @param {...*} items The items to log
   */
  error (...items) { this._log('error', items) }

  /**
   * Displays data in a tabular form, @see {@link https://developer.mozilla.org/fr/docs/Web/API/Console/table}
   * @param {object|array} data The data to see in a table
   */
  table (data) { this._log('table', [ data ]) }

  /**
   * Instantiates a new Logger instance with a given tag
   * @param {string} tag The tag to create the logger with
   * @returns {Logger} The new logger using the provided tag
   */
  tag (tag) {
    const { _name: name, _logger: logger } = this
    return new Log({ name, tag, logger })
  }
}
