import { _reduce } from '../collection'

describe('_reduce', () => {
  const accArgs = (memo, value, key, source) => {
    memo.push({ value, key, source })
    return memo
  }
  const sum = (memo, current) => memo + current
  const initialValue = 10

  describe('Array', () => {
    const array = [ 1, 2, 3 ]
    const empty = []

    test('without initial value', () => {
      expect(() => _reduce(array, sum)).toThrow()
    })

    test('empty', () => {
      expect(_reduce(empty, sum, initialValue)).toEqual(initialValue)
    })

    test('non-empty', () => {
      expect(_reduce(array, sum, initialValue)).toEqual(array.reduce(sum, initialValue))
    })

    test('parameters', () => {
      expect(_reduce(array, accArgs, [])).toEqual(array.reduce(accArgs, []))
    })
  })

  describe('Object', () => {
    const object = { foo: 42, bar: 10 }
    const empty = {}

    test('without initial value', () => {
      expect(() => _reduce(object, sum)).toThrow()
    })

    test('empty', () => {
      expect(_reduce(empty, sum, initialValue)).toEqual(initialValue)
    })

    test('non-empty', () => {
      expect(_reduce(object, sum, initialValue)).toEqual(object.foo + object.bar + initialValue)
    })

    test('parameters', () => {
      expect(_reduce(object, accArgs, [])).toEqual([ // warning, depends on iteration order on object. Fix me
        { key: 'foo', value: 42, source: object },
        { key: 'bar', value: 10, source: object }
      ])
    })
  })
})
