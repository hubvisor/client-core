import flatten from '../flatten'

describe('flatten', () => {
  test('mixed array', () => {
    expect(flatten([ [ 1, 'hello' ], null, undefined, [ { foo: 'bar' }, [ 'baz', 1 ] ] ]))
      .toEqual([ 1, 'hello', null, undefined, { foo: 'bar' }, [ 'baz', 1 ] ])
  })

  test('object', () => {
    expect(flatten({ k1: [ 1, 'hello' ], k2: null, k3: undefined, k4: [ { foo: 'bar' }, [ 'baz', 1 ] ] }))
      .toEqual([ 1, 'hello', null, undefined, { foo: 'bar' }, [ 'baz', 1 ] ])
  })
})
