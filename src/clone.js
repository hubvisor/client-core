import { isobj, isbool, isnum, isstring } from './types'
import mapValues from './collection/mapValues'

/**
 * Clones an object deeply. New values are created for objects and array.
 * @param {*} val the value to be copied
 * @returns the cloned copy
 */
export default function clone (val) {
  if (isbool(val) || isnum(val) || isstring(val)) { // maybe boxed objects not primitives
    return val
  }
  // TODO: handle Sets and other specific types
  if (isobj(val)) {
    return mapValues(val, v => clone(v))
  }
  return val
}
