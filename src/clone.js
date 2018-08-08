import { isobj } from './types'
import { forEach } from './collection'

/**
 * Clone implementation for typed object
 * @param {any} val The value to be cloned
 * @param {function} cloneFn An helper to clone child values when appropriate
 */
function _createClone (val) {
  switch (val.constructor) {
    case String: return new String(val) // eslint-disable-line no-new-wrappers
    case Number: return new Number(val) // eslint-disable-line no-new-wrappers
    case Boolean: return new Boolean(+val) // eslint-disable-line no-new-wrappers
    case Date: return new Date(+val)
    // Matches `RegExp` flags from their coerced string values.
    case RegExp: return new RegExp(val.source, /\w*$/.exec(val))
    case Array: return []
    case Set: return new Set()
    case Map: return new Map()
    case Object: return {}
    // e.g. DataView, Buffer
    // TODO: custom cloning
    default:
      throw new Error(`Unsupported type to clone: ${val.constructor} !`)
  }
}

function _cloneChilds (dst, src, cloneChild) {
  switch (src.constructor) {
    case Array:
      src.forEach(child => dst.push(cloneChild(child)))
      break
    case Set:
      src.forEach(child => dst.push(cloneChild(child)))
      break
    case Map:
      src.forEach((child, key) => dst.set(key, cloneChild(child)))
      break
    case Object:
      forEach(src, (child, key) => { dst[key] = cloneChild(child) })
      break
  }
}

/**
 * Creates a deep copy of a value
 * @param {any} val The value to be deeply cloned.
 * @param {Map<any, any>} cloneMap a mapping from source values to cloned values in order to catch circular references
 * @returns the cloned copy
 */
function _clone (val, cloneMap = new Map()) {
  // return primitive values
  if (!isobj(val)) { return val }

  // null is an singleton object
  if (val === null) { return val }

  // if this value was already cloned during traversal, use it (avoid infinite recursion in case of circular references)
  const existingValue = cloneMap.get(val)
  if (existingValue !== undefined) { return existingValue }

  // initialize & store the cloned reference before copying childs to support recursion
  const clonedVal = _createClone(val)
  cloneMap.set(val, clonedVal)

  _cloneChilds(clonedVal, val, child => _clone(child, cloneMap))
  return clonedVal
}

/**
 * Creates a deep copy of a value
 * @param {any} val the value to be cloned
 * @returns the cloned copy
 */
export default function clone (val) {
  return _clone(val)
}
