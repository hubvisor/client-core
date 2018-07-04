import mapValues from '../mapValues'

describe('mapValues', () => {
  function createMapper () {
    let weight = 1 // so that iteration order is important
    return (val) => {
      return val * val * weight++
    }
  }

  describe('Array', () => {
    test('values', () => {
      expect(mapValues([ 1, 2, 3 ], createMapper())).toEqual([ 1, 2, 3 ].map(createMapper()))
    })

    test('arguments', () => {
      const source = [ 1, 2, 3 ]
      const expected = [
        { value: 1, key: 0, source },
        { value: 2, key: 1, source },
        { value: 3, key: 2, source }
      ]
      expect(mapValues(source, (value, key, source) => ({ value, key, source }))).toEqual(expected)
    })
  })

  describe('Object', () => {
    test('values', () => {
      expect(mapValues({ foo: 42, bar: 0 }, createMapper())).toEqual({
        foo: 42 * 42,
        bar: 0
      })
    })
  })

  test('arguments', () => {
    const source = { foo: 42, bar: 0 }
    const expected = {
      foo: { value: 42, key: 'foo', source },
      bar: { value: 0, key: 'bar', source }
    }
    expect(mapValues(source, (value, key, source) => ({ value, key, source }))).toEqual(expected)
  })
})
