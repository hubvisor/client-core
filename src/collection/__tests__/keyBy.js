import keyBy from '../keyBy'

describe('keyBy', () => {
  test('array', () => {
    expect(keyBy([
      { id: 0, value: 'foo' },
      { id: 1, value: 'bar' },
      { id: 2, value: 'baz' }
    ], v => v.value)).toEqual({
      foo: { id: 0, value: 'foo' },
      bar: { id: 1, value: 'bar' },
      baz: { id: 2, value: 'baz' }
    })
  })

  test('object', () => {
    expect(keyBy({
      foo: { id: 0 },
      bar: { id: 1 },
      baz: { id: 2 }
    }, (v, k) => k)).toEqual({
      foo: { id: 0 },
      bar: { id: 1 },
      baz: { id: 2 }
    })
  })

  test('duplicate keys', () => {
    expect(keyBy([
      { id: 0, value: 'foo' },
      { id: 1, value: 'bar' },
      { id: 2, value: 'baz' },
      { id: 3, value: 'foo' }
    ], v => v.value)).toEqual({
      bar: { id: 1, value: 'bar' },
      baz: { id: 2, value: 'baz' },
      foo: { id: 3, value: 'foo' }
    })
  })

  test('filter undefined and null keys', () => {
    expect(keyBy([
      { id: 0, value: 'foo' },
      { id: 1, value: 'bar' },
      { id: 2, value: 'baz' },
      { id: 3, value: 'foo' }
    ], v => {
      if (v.id % 2 === 0) { return v.value }
    })).toEqual({
      foo: { id: 0, value: 'foo' },
      baz: { id: 2, value: 'baz' }
    })
  })
})
