import { arrify, uuid, hashCode } from '../util'

describe('util', () => {
  test('uuid', () => {
    const randomIds = new Array(10).fill().map(_ => uuid())
    const ids = new Set(randomIds)

    expect(ids.size).toBe(randomIds.length) // expect id to be unique
    for (const id of ids) {
      expect(id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)
    }
  })

  test('arrify', () => {
    const array = [ 'foo', 'bar', 'baz', 'foo' ]
    const obj = { foo: 42, bar: 'baz' }
    expect(arrify(array)).toEqual(array) // not wrapping array
    expect(arrify(null)).toEqual([]) // empty on null/undefined
    expect(arrify(undefined)).toEqual([]) // empty on null/undefined
    expect(arrify(1)).toEqual([ 1 ]) // wrap values
    expect(arrify(true)).toEqual([ true ]) // wrap values
    expect(arrify('foo')).toEqual([ 'foo' ]) // wrap values
    expect(arrify(obj)).toEqual([ obj ]) // wrap objects
    expect(arrify(new Set(array))).toEqual(Array.from(new Set(array))) // working on iterable
  })

  test('hashCode', () => {
    const randomStrings = new Array(10).fill().map(_ => uuid())
    randomStrings.forEach(str1 => {
       // could be optimized as this is the same array we can perform the first triangle of the matrix
      randomStrings.forEach(str2 => {
        if (str1 === str2) { // equality => same hash
          expect(hashCode(str1)).toBe(hashCode(str2))
        }
        if (hashCode(str1) != hashCode(str2)) { // different hash => not equal
          expect(str1).not.toBe(str2)
        }
      })
    })
  })
})
