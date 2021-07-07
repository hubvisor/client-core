import compact from '../compact'

describe('compact', () => {
  test('array', () => {
    expect(compact([ 42, null, false, 'foo', undefined, { bar: 'baz', baz: undefined }, [ 1 ] ]))
      .toEqual([ 42, false, 'foo', { bar: 'baz', baz: undefined }, [ 1 ] ])
  })

  test('object', () => {
    expect(compact({
      k1: 42,
      k2: null,
      k3: false,
      k4: 'foo',
      k5: undefined,
      k6: { bar: 'baz', baz: undefined },
      k7: [ 1 ]
    }))
      .toEqual({
        k1: 42,
        k3: false,
        k4: 'foo',
        k6: { bar: 'baz', baz: undefined },
        k7: [ 1 ]
      })
  })
})
