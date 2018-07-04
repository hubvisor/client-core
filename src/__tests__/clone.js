import clone from '../clone'

// we WANT to test functions against boxed values
/* eslint-disable no-new-wrappers */

describe('clone', () => {
  test('object', () => {
    const source = {
      k1: 1,
      k2: null,
      k3: undefined,
      k4: 'foo',
      k5: [ 'bar' ],
      k6: { baz: 42 },
      k7: new Number(123),
      k8: new String('abc')
    }
    const result = clone(source)
    expect(result).toEqual(source)
    expect(result).not.toBe(source)
    expect(result.k5).not.toBe(source.k5)
    expect(result.k6).not.toBe(source.k6)
  })

  test('array', () => {
    const source = [ 1, null, undefined, 'foo', [ 'bar' ], { baz: 42 }, new Number(123), new String('abc') ]
    const result = clone(source)
    expect(result).toEqual(source)
    expect(result).not.toBe(source)
    expect(result[4]).not.toBe(source[4])
    expect(result[5]).not.toBe(source[5])
  })

  test('values', () => {
    [ 1, null, undefined, 'foo', new Number(123), new String('abc'), new Boolean(true) ].forEach(v => {
      expect(clone(v)).toBe(v)
    })
  })
})
