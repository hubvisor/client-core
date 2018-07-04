import reduce from '../reduce'

describe('reduce', () => {
  const accArgs = (memo, value, key, source) => {
    memo.push({ value, key, source })
    return memo
  }
  const sum = (memo, current) => memo + current
  const initialValue = 10

  test('No initial value', () => {
    expect(reduce(undefined, accArgs, [])).toEqual([])
    expect(reduce(undefined, accArgs, {})).toEqual({})
  })

  describe('Array', () => {
    const array = [ 1, 2, 3 ]
    const empty = []

    test('without initial value', () => {
      expect(() => reduce(array, sum)).toThrow()
    })

    test('empty', () => {
      expect(reduce(empty, sum, initialValue)).toEqual(initialValue)
    })

    test('non-empty', () => {
      expect(reduce(array, sum, initialValue)).toEqual(array.reduce(sum, initialValue))
    })

    test('parameters', () => {
      expect(reduce(array, accArgs, [])).toEqual(array.reduce(accArgs, []))
    })
  })

  describe('Object', () => {
    const object = { foo: 42, bar: 10 }
    const empty = {}

    test('without initial value', () => {
      expect(() => reduce(object, sum)).toThrow()
    })

    test('empty', () => {
      expect(reduce(empty, sum, initialValue)).toEqual(initialValue)
    })

    test('non-empty', () => {
      expect(reduce(object, sum, initialValue)).toEqual(object.foo + object.bar + initialValue)
    })

    test('parameters', () => {
      expect(reduce(object, accArgs, [])).toEqual([ // warning, depends on iteration order on object. Fix me
        { key: 'foo', value: 42, source: object },
        { key: 'bar', value: 10, source: object }
      ])
    })
  })
})
