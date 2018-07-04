import filter from '../filter'

describe('filter', () => {
  test('array', () => {
    expect(filter([ 1, 2, 3, 42 ], v => v % 2 === 0))
      .toEqual([ 2, 42 ])
  })

  test('object', () => {
    expect(filter({ foo: 42, bar: 2, baz: 31 }, v => v % 2 === 0))
      .toEqual({ foo: 42, bar: 2 })
  })
})
